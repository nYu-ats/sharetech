import traceback

from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import (
    AutheException,
    InternalServerException,
    TokenCacheException,
)
from api.repositories.mongo.organization_repository import OrganizationRepository
from api.repositories.mongo.organization_repository.interface import (
    OrganizationRepositoryIF,
)
from api.repositories.mongo.user_repository import UserRepository
from api.repositories.mongo.user_repository.interface import UserRepositoryIF
from api.repositories.redis.kv_store import KVStore
from api.repositories.redis.kv_store.interface import KVStoreIF
from api.services.authentication_service.dto import CurrentActiveUser
from api.services.authentication_service.interface import AuthenticationServiceIF
from api.utility.email import EmailUtil
from api.utility.hasher import Hasher
from api.utility.jwt import JwtUtil
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer


class AuthenticationService(AuthenticationServiceIF):
    _oauth2_schema = OAuth2PasswordBearer(tokenUrl="auth/token")

    def __init__(
        self,
        user_repository: UserRepositoryIF = Depends(UserRepository),
        organization_repository: OrganizationRepositoryIF = Depends(
            OrganizationRepository
        ),
        kv_store: KVStoreIF = Depends(KVStore),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._user_repository = user_repository
        self._organization_repository = organization_repository
        self._kv_store = kv_store
        self.logger = logger

    async def generate_token(self, email: str, password: str):
        organization = EmailUtil.extract_domain(email)
        try:
            if not organization:
                raise AutheException(detail=f"{email} is invalid pattern")
            if not await self._organization_repository.find_by_name(organization):
                raise AutheException(detail=f"{organization} is inactive or not exist")

            entity = await self._user_repository.find_by_email(organization, email)
            if not Hasher.verify(password, entity.password) or not entity.is_active:
                raise AutheException(
                    detail=f"{password} is not match {entity.password}"
                )

            token = JwtUtil.generate_token(
                user=entity.email,
                role=entity.role,
                organization=organization,
            )
            if self._kv_store.set(entity.email, token):
                return token

            raise TokenCacheException()
        except AutheException as e:
            self.logger.info(e.detail)
            raise e
        except TokenCacheException as e:
            self.logger.error("Token store failed")
            raise e
        except Exception as e:
            self.logger.error(e)
            raise e

    async def deactivate_token(self, email: str) -> str:
        ...

    @staticmethod
    async def provide_current_active_user(
        current_token: str = Depends(_oauth2_schema),
        user_repository: UserRepositoryIF = Depends(UserRepository),
        kv_store: KVStoreIF = Depends(KVStore),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        decoded_token = JwtUtil.decode(current_token)
        email = decoded_token.get("user", None)
        organization = decoded_token.get("organization", None)

        if not (email and organization):
            raise AutheException(detail="Provided token is invalid")

        try:
            entity = await user_repository.find_by_email(organization, email)
            cached_token = kv_store.get(email)
            if entity and cached_token.value == current_token:
                return CurrentActiveUser(
                    email=entity.email,
                    role=entity.role,
                    organization=organization,
                )

            raise AutheException(detail="Provided token is invalid")
        except AutheException as e:
            logger.warning(e.detail)
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)
