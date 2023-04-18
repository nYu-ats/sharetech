from api.core.context import app_context
from api.core.context.logging import Logger
from api.endpoint.models import UserDB
from api.services.user_service import UserService
from api.services.user_service.interface import UserServiceIF
from fastapi import APIRouter, Depends

# logger = Logger.get_child(__name__)

user_router = APIRouter(prefix="/users", tags=["users"])


@user_router.get("/me", response_model=UserDB)
def get_me(
    user_service: UserServiceIF = Depends(UserService),
    logger: Logger = Depends(app_context.logger_provider(__name__)),
):
    return {
        "id": 1,
        "icon": "USERICON",
        "last_name": "test",
        "first_name": "test",
        "user_unique_id": "test",
        "role": "test",
        "organization": "test",
    }
