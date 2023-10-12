from abc import ABCMeta, abstractmethod
from typing import Union

from api.repositories.mongo.user_repository.entity import UserEntity
from motor.motor_asyncio import AsyncIOMotorCollection


class UserRepositoryIF(metaclass=ABCMeta):
    @abstractmethod
    def _collection(self, organization: str) -> AsyncIOMotorCollection:
        ...

    @abstractmethod
    async def find_by_email(
        self, organization: str, email: str
    ) -> Union[UserEntity, None]:
        ...

    @abstractmethod
    async def create(
        self,
        organization: str,
        organization_id: str,
        email: str,
        hashed_password: str,
        role: str,
        is_active: bool,
    ) -> UserEntity:
        ...

    @abstractmethod
    async def set_active(self, organization: str, id: str) -> UserEntity:
        ...
