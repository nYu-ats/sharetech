from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import AutheException, InternalServerException
from api.endpoint.models import Error, Token
from api.services.authentication_service import AuthenticationService
from api.services.authentication_service.interface import AuthenticationServiceIF
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm

auth_router = APIRouter(prefix="/auth", tags=["auth"])


@auth_router.post(
    "/token",
    response_model=Token,
    responses={
        status.HTTP_401_UNAUTHORIZED: {"model": Error},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": Error},
    },
)
async def generate_token(
    auth_form: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthenticationServiceIF = Depends(AuthenticationService),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    try:
        token = await auth_service.generate_token(
            auth_form.username, auth_form.password
        )
        logger.info(f"{auth_form.username} login succeeded")
        return {"token": token}
    except AutheException as e:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED, content=e.as_content()
        )
    except InternalServerException as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=e.as_content()
        )


@auth_router.delete("/token", response_model=Token, responses={400: {"model": Error}})
async def deactivate_token(
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    return {"token": "test"}
