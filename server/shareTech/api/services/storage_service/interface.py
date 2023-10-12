from abc import ABCMeta, abstractmethod
from typing import Dict, List, Union

from api.core.extension.option import AllowedStorageMethod, StorageType
from api.services.storage_service.dto import StorageSignedUrl


class StorageServiceIF(metaclass=ABCMeta):
    @abstractmethod
    async def generate_signed_urls(
        self,
        method: AllowedStorageMethod,
        bucket: str,
        keys: List[Dict[str, str]],
    ) -> Union[StorageSignedUrl, None]:
        ...

    @abstractmethod
    async def copy_objects(
        self,
        from_bucket: StorageType,
        to_bucket: StorageType,
        keys: List[Dict[str, str]],
    ) -> List[str]:
        ...

    @abstractmethod
    async def refresh_directory(self, bucket: str, directory: str) -> int:
        ...

    @abstractmethod
    async def exist(self, bucket: str, keys: List[str]) -> Dict[str, bool]:
        ...
