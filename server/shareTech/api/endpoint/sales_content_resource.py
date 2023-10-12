from typing import List, Optional

from api.core.context import app_context
from api.core.context.config import Config
from api.core.context.logging import Logger
from api.core.extension.exception import (
    InternalServerException,
    SalesContentDoesNotExist,
    StorageUsableException,
)
from api.core.extension.option import (
    AllowedStorageMethod,
    SalesContentType,
    StorageType,
)
from api.endpoint.models import (
    Envelope,
    Error,
    FileExist,
    SalesContent,
    SalesContentDB,
    SalesContentSharedUsers,
    SalesContentSharingPassword,
    StorageSignedUrl,
)
from api.services.authentication_service import AuthenticationService
from api.services.authentication_service.dto import CurrentActiveUser
from api.services.sales_content_service import SalesContentService
from api.services.sales_content_service.dto import (
    SalesContentDto,
    SalesContentSharedUserDto,
)
from api.services.sales_content_service.interface import SalesContentServiceIF
from api.services.storage_service import StorageService
from api.services.storage_service.interface import StorageServiceIF
from fastapi import APIRouter, Depends, Query, status
from fastapi.responses import JSONResponse

sales_content_router = APIRouter(prefix="/sales-contents", tags=["sales-content"])


@sales_content_router.get(
    "/",
    response_model=Envelope[List[SalesContentDB]],
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
        status.HTTP_204_NO_CONTENT: {"model": {}},
    },
)
async def list_sales_contents(
    owner_id: Optional[List[str]] = Query([], alias="owner_id[]"),
    _order_by: Optional[str] = "created_at",
    _cursor: Optional[int] = 0,
    _limit: Optional[int] = 100,
    sales_content_service: SalesContentServiceIF = Depends(SalesContentService),
    app_config: Config = Depends(app_context.config_provider),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        sales_contents = await sales_content_service.list(
            current_user.organization, owner_id, _order_by, _cursor, _limit
        )
        if sales_contents:
            return {
                "data": [sales_content.as_dict() for sales_content in sales_contents],
                "pagnation": {
                    "size": len(sales_contents),
                    "previous_cursor": _cursor,
                    "next_cursor": _cursor + len(sales_contents),
                },
            }
        else:
            raise SalesContentDoesNotExist()
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )
    except SalesContentDoesNotExist:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content={})


@sales_content_router.post(
    "/",
    response_model=SalesContentDB,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def create_sales_content(
    body: SalesContent,
    sales_content_service: SalesContentServiceIF = Depends(SalesContentService),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):

    try:
        created_sales_content = await sales_content_service.create(
            current_user.organization,
            SalesContentDto(
                owner_id=body.owner_id,
                title=body.title,
                tags=body.tags,
                contents=[content.to_dto() for content in body.contents],
            ),
        )
        return created_sales_content.as_dict()
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@sales_content_router.get(
    "/{content_id}",
    response_model=SalesContentDB,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
        status.HTTP_204_NO_CONTENT: {"model": {}},
    },
)
async def retreive_sales_content(
    content_id: str,
    organization: Optional[str] = "",
    sales_content_service: SalesContentServiceIF = Depends(SalesContentService),
    app_config: Config = Depends(app_context.config_provider),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    # TODO current_userが指定のorganizationを閲覧できる権限を持っているかの確認処理
    _organizatioin = organization if organization else current_user.organization
    try:
        sales_content = await sales_content_service.find_by_id(
            _organizatioin, content_id
        )
        if sales_content:
            return sales_content.as_dict()
        else:
            raise SalesContentDoesNotExist()
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )
    except SalesContentDoesNotExist:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT, content={})


@sales_content_router.put(
    "/{content_id}",
    response_model=SalesContentDB,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def update_sales_content(
    body: SalesContent,
    content_id: str,
    sales_content_service: SalesContentServiceIF = Depends(SalesContentService),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        updateed_sales_content = await sales_content_service.update_one(
            current_user.organization,
            content_id,
            SalesContentDto(
                owner_id=body.owner_id,
                title=body.title,
                tags=body.tags,
                contents=[content.to_dto() for content in body.contents],
            ),
        )
        return updateed_sales_content.as_dict()
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@sales_content_router.get(
    "/{content_id}/contents/{content_index}/{content_type}/storage/signed-url",
    response_model=StorageSignedUrl,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Error},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def generate_storage_signed_url(
    content_id: str,
    content_index: int,
    content_type: SalesContentType,
    storage_type: StorageType,
    method: AllowedStorageMethod,
    resources: List[str] = Query(alias="resources[]"),
    organization: Optional[str] = "",
    storage_service: StorageServiceIF = Depends(StorageService),
    app_config: Config = Depends(app_context.config_provider),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    # TODO ファイル(resource)フォーマットのチェック
    # TODO ファイル種別と対象バケットの整合性チェック
    if content_type.value not in [
        SalesContentType.PDF.value,
        SalesContentType.MOVIE.value,
    ]:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=StorageUsableException(
                detail=f"content_typeは{SalesContentType.PDF.value}"
                f"もしくは{SalesContentType.MOVIE.value}のみ指定可能です"
            ).as_content(),
        )
    # TODO current_userが指定のorganizationを閲覧できる権限を持っているかの確認処理
    _organizatioin = organization if organization else current_user.organization
    keys = {
        resource: "/".join(
            [
                _organizatioin,
                content_id,
                str(content_index),
                content_type.value.lower(),
                resource,
            ]
        )
        for resource in resources
    }

    try:
        signed_url = await storage_service.generate_signed_urls(
            method, app_config["gcs"]["bucket"][str(storage_type.value).lower()], keys
        )
        return {
            "allowd_method": signed_url.allowd_method,
            "urls": signed_url.urls,
            "expiration": str(signed_url.expiration),
        }
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@sales_content_router.get(
    "/{content_id}/contents/{content_index}/{content_type}/storage/{file_name}/exist",
    response_model=FileExist,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Error},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def check_file_exist(
    content_id: str,
    content_index: int,
    content_type: SalesContentType,
    file_name: str,
    storage_type: StorageType,
    storage_service: StorageServiceIF = Depends(StorageService),
    app_config: Config = Depends(app_context.config_provider),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    # TODO ファイル種別と対象バケットの整合性チェック
    if content_type.value not in [
        SalesContentType.PDF.value,
        SalesContentType.MOVIE.value,
    ]:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=StorageUsableException(
                detail=f"content_typeは{SalesContentType.PDF.value}"
                f"もしくは{SalesContentType.MOVIE.value}のみ指定可能です"
            ).as_content(),
        )
    key = "/".join(
        [
            current_user.organization,
            content_id,
            str(content_index),
            content_type.value.lower(),
            file_name,
        ]
    )
    try:
        result = await storage_service.exist(
            app_config["gcs"]["bucket"][str(storage_type.value).lower()], [key]
        )
        return {
            "exist": result[key],
        }
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@sales_content_router.get(
    "/{content_id}/share/users/",
    response_model=SalesContentSharedUsers,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def get_sales_content_shared_users(
    content_id: str,
    is_active: bool = True,
    sales_content_service: SalesContentServiceIF = Depends(SalesContentService),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        shared_users = await sales_content_service.get_shared_users(
            current_user.organization, content_id, is_active
        )
        if shared_users:
            return {"users": [shared_user.as_dict() for shared_user in shared_users]}
        else:
            return {"users": []}
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@sales_content_router.put(
    "/{content_id}/share/users/",
    response_model=SalesContentSharedUsers,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def update_sales_content_shared_users(
    body: SalesContentSharedUsers,
    content_id: str,
    sales_content_service: SalesContentServiceIF = Depends(SalesContentService),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        shared_users = await sales_content_service.update_shared_users(
            current_user.organization,
            content_id,
            [
                SalesContentSharedUserDto(
                    current_user.organization, user.user_id, user.is_active
                )
                for user in body.users
            ],
        )
        if shared_users:
            return {"users": [shared_user.as_dict() for shared_user in shared_users]}
        else:
            return {"users": []}
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@sales_content_router.get(
    "/{content_id}/share/password/",
    response_model=SalesContentSharingPassword,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def get_sales_content_shared_password(
    content_id: str,
    sales_content_service: SalesContentServiceIF = Depends(SalesContentService),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        password = await sales_content_service.get_password(
            current_user.organization, content_id
        )
        if password:
            return {"password": password}
        else:
            return {"password": ""}
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@sales_content_router.put(
    "/{content_id}/share/password/",
    response_model=SalesContentSharingPassword,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def update_sales_content_shared_password(
    content_id: str,
    body: SalesContentSharingPassword,
    sales_content_service: SalesContentServiceIF = Depends(SalesContentService),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        password = await sales_content_service.update_password(
            current_user.organization, content_id, body.password
        )
        if password:
            return {"password": password}
        else:
            return {"password": ""}
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )
