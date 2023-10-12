import itertools
import random
import string
import traceback
from datetime import datetime, timedelta, timezone
from typing import Any, Coroutine, List, Union

from api.core.context import app_context
from api.core.context.config import Config
from api.core.context.logging import Logger
from api.core.extension.exception import DatabaseException, InternalServerException
from api.core.extension.option import Roles, SalesContentType, StorageType
from api.repositories.mongo.sales_content_access_report_repository import (
    SalesContentAccessReportRepository,
)
from api.repositories.mongo.sales_content_access_report_repository.interface import (
    SalesContentsAccessReportRepositoryIF,
)
from api.repositories.mongo.sales_content_repository import SalesContentsRepository
from api.repositories.mongo.sales_content_repository.dto import (
    SalesContentDto as SalesContentDtoRepo,
)
from api.repositories.mongo.sales_content_repository.filter import SalesContentFilter
from api.repositories.mongo.sales_content_repository.interface import (
    SalesContentsRepositoryIF,
)
from api.repositories.mongo.sales_contents_share_repository import (
    SalesContentShareRepository,
)
from api.repositories.mongo.sales_contents_share_repository.interface import (
    SalesContentsSahreRepositoryIF,
)
from api.services.sales_content_service.dto import (
    SalesContentDbDto,
    SalesContentDto,
    SalesContentSharedUserDto,
)
from api.services.sales_content_service.interface import SalesContentServiceIF
from api.services.storage_service import StorageService
from api.services.storage_service.interface import StorageServiceIF
from api.services.user_service import UserService
from api.services.user_service.interface import UserServiceIF
from fastapi import Depends


class SalesContentService(SalesContentServiceIF):
    def __init__(
        self,
        sales_content_repository: SalesContentsRepositoryIF = Depends(
            SalesContentsRepository
        ),
        sales_content_share_repository: SalesContentsSahreRepositoryIF = Depends(
            SalesContentShareRepository
        ),
        sales_content_access_report_repository: SalesContentsAccessReportRepositoryIF = Depends(
            SalesContentAccessReportRepository
        ),
        storage_service: StorageServiceIF = Depends(StorageService),
        user_service: UserServiceIF = Depends(UserService),
        app_config: Config = Depends(app_context.config_provider),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self.sales_content_repository = sales_content_repository
        self.sales_content_share_repository = sales_content_share_repository
        self.sales_content_access_report_repository = (
            sales_content_access_report_repository
        )
        self.storage_service = storage_service
        self.user_serivice = user_service
        self._app_config = app_config
        self.logger = logger

    async def find_by_id(
        self, organization: str, id: str
    ) -> Union[SalesContentDbDto, None]:
        try:
            sales_content = await self.sales_content_repository.find_by_id(
                organization, id
            )
            await self.sales_content_access_report_repository.add_history(
                organization,
                sales_content._id,
                sales_content.owner_id,
                datetime.now(timezone(timedelta(hours=9), "JST")),
            )
            if sales_content:
                return SalesContentDbDto(
                    id=sales_content._id,
                    owner_id=sales_content.owner_id,
                    title=sales_content.title,
                    tags=sales_content.tags,
                    contents=sales_content.contents,
                )
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

        return

    async def list(
        self,
        organization: str,
        owner_id: List[str] = [],
        _order_by: str = "created_at",
        _cursor: int = 0,
        _limit: int = 20,
    ) -> List[Union[SalesContentDbDto, None]]:
        sales_content_filter = SalesContentFilter(owner_id, _order_by, _cursor, _limit)
        try:
            sales_contents = await self.sales_content_repository.filter(
                organization, sales_content_filter
            )
            if sales_contents:
                return [
                    SalesContentDbDto(
                        id=sales_content._id,
                        owner_id=sales_content.owner_id,
                        title=sales_content.title,
                        tags=sales_content.tags,
                        contents=sales_content.contents,
                    )
                    for sales_content in sales_contents
                ]
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

        return []

    async def create(
        self, organization: str, sales_content: SalesContentDto
    ) -> Union[SalesContentDbDto, None]:
        try:
            # TODO 作成時にストレージに保管されているコンテンツについてはdistributionへ移動が必要
            created_sales_content = await self.sales_content_repository.create(
                organization,
                SalesContentDtoRepo(
                    owner_id=sales_content.owner_id,
                    tags=sales_content.tags,
                    title=sales_content.title,
                    contents=[
                        content.to_repository_dto()
                        for content in sales_content.contents
                    ],
                ),
            )
            random_strs = [
                random.choice(string.ascii_letters + string.digits) for _ in range(6)
            ]
            if await self.sales_content_share_repository.initialize(
                organization, created_sales_content._id, "".join(random_strs)
            ) and await self.sales_content_access_report_repository.initialize(
                organization, created_sales_content._id
            ):
                return SalesContentDbDto(
                    id=created_sales_content._id,
                    owner_id=created_sales_content.owner_id,
                    title=sales_content.title,
                    tags=created_sales_content.tags,
                    contents=created_sales_content.contents,
                )
            else:
                raise DatabaseException()
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def update_one(
        self, organization: str, content_id: str, sales_content: SalesContentDto
    ) -> Coroutine[Any, Any, Union[SalesContentDbDto, None]]:
        file_keys = [
            "/".join(
                [
                    organization,
                    content_id,
                    str(content.index),
                    content.content_type.value.lower(),
                    content.name,
                ]
            )
            for content in sales_content.contents
            if content.content_type
            in [
                SalesContentType.PDF,
                SalesContentType.MOVIE,
            ]
        ]
        try:
            file_exists = await self.storage_service.exist(
                self._app_config["gcs"]["bucket"][
                    str(StorageType.UPLOAD.value).lower()
                ],
                file_keys,
            )
            new_in_file_keys = [
                key for key, is_exist in file_exists.items() if is_exist
            ]

            await self.storage_service.refresh_directory(
                self._app_config["gcs"]["bucket"][
                    str(StorageType.DISTRIBUTION.value).lower()
                ],
                new_in_file_keys,
            )

            await self.storage_service.copy_objects(
                self._app_config["gcs"]["bucket"][
                    str(StorageType.UPLOAD.value).lower()
                ],
                self._app_config["gcs"]["bucket"][
                    str(StorageType.DISTRIBUTION.value).lower()
                ],
                new_in_file_keys,
            )

            updated_sales_content = await self.sales_content_repository.update_one(
                organization,
                content_id,
                SalesContentDtoRepo(
                    owner_id=sales_content.owner_id,
                    tags=sales_content.tags,
                    title=sales_content.title,
                    contents=[
                        content.to_repository_dto()
                        for content in sales_content.contents
                    ],
                ),
            )
            return SalesContentDbDto(
                id=updated_sales_content._id,
                owner_id=updated_sales_content.owner_id,
                title=sales_content.title,
                tags=updated_sales_content.tags,
                contents=updated_sales_content.contents,
            )
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def get_shared_users(
        self, organization: str, content_id: str, is_active: bool = True
    ) -> List[Union[SalesContentSharedUserDto, None]]:
        try:
            users = await self.sales_content_share_repository.get_users(
                organization, content_id, is_active
            )
            if users:
                return [
                    SalesContentSharedUserDto(
                        organization=user.organization,
                        user_id=user.user_id,
                        is_active=user.is_active,
                    )
                    for user in users
                ]
            else:
                return
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def update_shared_users(
        self, organization: str, content_id: str, users: List[SalesContentSharedUserDto]
    ) -> List[Union[SalesContentSharedUserDto, None]]:
        users_active_mapping = itertools.groupby(users, lambda u: u.is_active)
        processed_users = []
        try:
            for is_active, grouping_users in users_active_mapping:
                add_users = []
                if is_active:
                    password = await self.get_password(organization, content_id)
                    for user in grouping_users:
                        await self.user_serivice.create(
                            user.user_id,
                            password,
                            Roles.COLLABORATOR_VIEWER.value,
                            True,
                        )
                        add_users.append(user)
                    users = await self.sales_content_share_repository.add_users(
                        organization, content_id, list(add_users)
                    )
                else:
                    users = await self.sales_content_share_repository.delete_users(
                        organization, content_id, list(grouping_users)
                    )
                processed_users.extend(
                    [
                        SalesContentSharedUserDto(
                            organization=user.organization,
                            user_id=user.user_id,
                            is_active=user.is_active,
                        )
                        for user in users
                    ]
                )
            return processed_users
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def get_password(
        self, organization: str, content_id: str
    ) -> Union[str, None]:
        try:
            password = await self.sales_content_share_repository.get_password(
                organization, content_id
            )
            return password
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def update_password(
        self, organization: str, content_id: str, password: str
    ) -> Union[str, None]:
        try:
            new_password = await self.sales_content_share_repository.update_password(
                organization, content_id, password
            )
            return new_password
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)
