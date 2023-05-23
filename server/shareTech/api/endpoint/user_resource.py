from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import (
    ActivateTokenException,
    InternalServerException,
    UserDuplicateException,
)
from api.endpoint.models import Error, User, UserDB
from api.services.authentication_service import AuthenticationService
from api.services.authentication_service.dto import CurrentActiveUser
from api.services.user_service import UserService
from api.services.user_service.interface import UserServiceIF
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

user_router = APIRouter(prefix="/users", tags=["users"])


@user_router.get(
    "/me",
    response_model=UserDB,
    responses={
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def get_current_user(
    user_service: UserServiceIF = Depends(UserService),
    current_user: CurrentActiveUser = Depends(
        AuthenticationService.provide_current_active_user
    ),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        user = await user_service.get_db_user(
            current_user.organization, current_user.email
        )
        return {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "organization": user.organization,
        }

    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@user_router.post(
    "/",
    response_model=UserDB,
    responses={
        status.HTTP_409_CONFLICT: {"model": Error},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def create_user(
    body: User,
    user_service: UserServiceIF = Depends(UserService),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        user = await user_service.preregister(body.email, body.password)
        return {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "organization": user.organization,
        }

    except UserDuplicateException as e:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT, content=e.as_content()
        )
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@user_router.get(
    "/activation/{token}",
    response_model=UserDB,
    responses={
        status.HTTP_400_BAD_REQUEST: {"model": Error},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def activate_user(
    token: str,
    user_service: UserServiceIF = Depends(UserService),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        user = await user_service.activate(token)
        return {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "organization": user.organization,
        }

    except ActivateTokenException as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST, content=e.as_content()
        )
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )
