from api.core.context import app_context
from api.core.context.logging import Logger
from api.core.extension.exception import AuthenticationFailed, KVStoreFailed
from api.repositories.mongo.user_repository import UserRepository
from api.repositories.mongo.user_repository.interface import UserRepositoryIF
from api.repositories.redis.kv_store import KVStore
from api.repositories.redis.kv_store.interface import KVStoreIF
from api.services.user_service.interface import UserServiceIF
from api.utility.hasher import Hasher
from api.utility.jwt import JwtUtil
from fastapi import Depends


class UserService(UserServiceIF):
    def __init__(
        self,
        user_repo: UserRepositoryIF = Depends(UserRepository),
        kv_store: KVStoreIF = Depends(KVStore),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._repository = user_repo
        self._kv_store = kv_store
        self.logger = logger

    async def get_user(self):
        ...

    async def generate_token(self, user_unique_id: str, password: str):
        try:
            entity = await self._repository.find_by_user_unique_id(user_unique_id)
            if not Hasher.verify(password, entity.password):
                raise AuthenticationFailed()

            jwt_token = JwtUtil.generate_token(
                user=entity.user_unique_id,
                role=entity.role,
                organization=entity.organization,
            )
            if self._kv_store.set(entity.user_unique_id, jwt_token):
                return jwt_token

            raise KVStoreFailed()
        except AuthenticationFailed as e:
            self.logger.info(f"{user_unique_id}'s password is not {password}")
            raise e
        except KVStoreFailed as e:
            self.logger.error("Token store failed")
            raise e
        except Exception as e:
            self.logger.error(e)
            raise e

    async def deactivate_token(self, user_unique_id: str) -> str:
        ...

    async def update_token_expiration(self, user_unique_id: str) -> str:
        ...
