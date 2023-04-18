from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import AuthenticationFailed
from api.endpoint.models import AuthenticateInfo, ErrorMessage, Token
from api.services.user_service import UserService
from api.services.user_service.interface import UserServiceIF
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

auth_router = APIRouter(prefix="", tags=["auth"])


@auth_router.post(
    "/login/token",
    response_model=Token,
    responses={status.HTTP_400_BAD_REQUEST: {"model": ErrorMessage}},
)
async def generate_token(
    authenticate_info: AuthenticateInfo,
    user_service: UserServiceIF = Depends(UserService),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        token = await user_service.generate_token(
            authenticate_info.user_unique_id, authenticate_info.password
        )
        logger.info(f"{authenticate_info.user_unique_id} login succeeded")
        return {"token": token}
    except AuthenticationFailed as e:
        logger.warning(f"{authenticate_info.user_unique_id} login failed")
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST, content={"message": e.message}
        )
    except Exception as e:
        logger.error(f"Uncontrolled error:\n{e}")
        raise e


@auth_router.post(
    "/logout/token", response_model=Token, responses={400: {"model": ErrorMessage}}
)
async def deactivate_token(
    user_service: UserServiceIF = Depends(UserService),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    return {"token": "test"}
