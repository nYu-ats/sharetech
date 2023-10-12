import traceback
import urllib
from concurrent.futures import Future, ThreadPoolExecutor
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Union

from api.core.context import app_context
from api.core.context.config import Config
from api.core.context.logging import Logger
from api.core.extension.exception import InternalServerException
from api.core.extension.option import AllowedStorageMethod, StorageType
from api.services.storage_service.dto import StorageSignedUrl
from api.services.storage_service.interface import StorageServiceIF
from fastapi import Depends
from google.cloud.storage import Blob, Bucket
from google.cloud.storage import Client as GcsClient


class StorageService(StorageServiceIF):
    def __init__(
        self,
        gcs_client: GcsClient = Depends(app_context.gcs_provider),
        app_config: Config = Depends(app_context.config_provider),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._gcs_client = gcs_client
        self._app_config = app_config
        self.logger = logger

    async def generate_signed_urls(
        self,
        method: AllowedStorageMethod,
        bucket: str,
        keys: List[Dict[str, str]],
    ) -> Union[StorageSignedUrl, None]:
        def generate_signed_url_task(
            bucket: Bucket,
            key: str,
            path: str,
            method: AllowedStorageMethod,
            expiration: timedelta,
        ) -> Tuple:
            self.logger.debug(f"Generate signed url for {path}")

            # get_blolbだと存在しないオブジェクト題してNoneとなってしまうためblobを使う
            blob: Blob = bucket.blob(path)

            if not blob.exists() and method == AllowedStorageMethod.GET:
                # 存在しないオブジェクトに対するGETリクエストは無効とみなす
                self.logger.warning(f"{path} does not exist.")
                return key, ""

            # MEDIAファイルについては大サイズなので、ストリーミングにする
            response_disposition = (
                None
                if "/pdf/" in path
                else urllib.parse.quote(f'attachment;filename="{path.split("/")[-1]}"')
            )

            url = blob.generate_signed_url(
                version="v4",
                expiration=expiration,
                method=method.value,
                # content_type="application/octet-stream",
                response_disposition=response_disposition,
            )

            return key, url

        target_bucket: Bucket = self._gcs_client.get_bucket(bucket)
        now = datetime.utcnow()
        expiration = timedelta(minutes=10)
        try:
            generated_signed_url = []
            # max_workders = cpu数 + 4
            with ThreadPoolExecutor(
                max_workers=6, thread_name_prefix="generate-gcs-signed-url"
            ) as executor:
                futures: List[Future] = []
                for key, path in keys.items():
                    futures.append(
                        executor.submit(
                            generate_signed_url_task,
                            target_bucket,
                            key,
                            path,
                            method,
                            expiration,
                        )
                    )
                generated_signed_url = [
                    {"key": f.result()[0], "value": f.result()[1]} for f in futures
                ]

            return StorageSignedUrl(method, generated_signed_url, now + expiration)
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def copy_objects(
        self,
        from_bucket: StorageType,
        to_bucket: StorageType,
        keys: List[Dict[str, str]],
    ) -> List[str]:
        def copy_task(from_bucket: Bucket, to_bucket: Bucket, key: str):
            blob = from_bucket.blob(key)
            copy_job = from_bucket.copy_blob(blob, to_bucket, key)

            copied_blob = to_bucket.blob(key)
            if copied_blob.exists():
                return copy_job.name

            self.logger.warning(f"{blob.name} copy task may be failed.")
            return ""

        from_bucket = self._gcs_client.bucket(from_bucket)
        to_bucket = self._gcs_client.bucket(to_bucket)
        try:
            with ThreadPoolExecutor(
                max_workers=6, thread_name_prefix="copy-objects"
            ) as executor:
                futures: List[Future] = []
                for key in keys:
                    futures.append(
                        executor.submit(copy_task, from_bucket, to_bucket, key)
                    )
                copied_objects = [f.result() for f in futures]
                return copied_objects
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def refresh_directory(self, bucket: str, directory: str) -> int:
        def delete_task(blob: Blob):
            self.logger.warning(f"{blob.name} will be deleted.")
            try:
                blob.delete()
                if blob.exists():
                    return False
                return True
            except Exception:
                return False

        target_bucket = self._gcs_client.bucket(bucket)
        blobs: List[Blob] = target_bucket.list_blobs(prefix=directory)
        try:
            with ThreadPoolExecutor(
                max_workers=6, thread_name_prefix="delete-objects"
            ) as executor:
                futures: List[Future] = []
                for blob in blobs:
                    futures.append(executor.submit(delete_task, blob))
                deleted_count = len([f.result() for f in futures if f.result()])
                return deleted_count
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def exist(self, bucket: str, keys: List[str]) -> Dict[str, bool]:
        def check_task(bucket: Bucket, key: str):
            blob = bucket.blob(key)
            return {key: blob.exists()}

        target_bucket = self._gcs_client.bucket(bucket)
        try:
            with ThreadPoolExecutor(
                max_workers=6, thread_name_prefix="check-objects"
            ) as executor:
                futures: List[Future] = []
                for key in set(keys):
                    futures.append(executor.submit(check_task, target_bucket, key))
                result = {}
                [result.update(**f.result()) for f in futures]
                return result
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)
