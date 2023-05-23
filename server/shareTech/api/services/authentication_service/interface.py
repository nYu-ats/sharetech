from abc import ABCMeta, abstractmethod, abstractstaticmethod

from api.core.context.logging import Logger
from api.repositories.mongo.user_repository.interface import UserRepositoryIF
from api.repositories.redis.kv_store.interface import KVStoreIF
from api.services.authentication_service.dto import CurrentActiveUser


class AuthenticationServiceIF(metaclass=ABCMeta):
    @abstractmethod
    async def generate_token(self, email: str, password: str) -> str:
        ...

    @abstractmethod
    async def deactivate_token(self, email: str) -> str:
        ...

    @abstractstaticmethod
    async def provide_current_active_user(
        self,
        token: str,
        user_repository: UserRepositoryIF,
        kv_store: KVStoreIF,
        logger: Logger,
    ) -> CurrentActiveUser:
        ...
