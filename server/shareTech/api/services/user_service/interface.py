from abc import ABCMeta, abstractmethod
from typing import Union

from api.core.extension.option import Roles
from api.services.user_service.dto import User


class UserServiceIF(metaclass=ABCMeta):
    @abstractmethod
    async def get_db_user(self, organization: str, email: str) -> Union[User, None]:
        ...

    @abstractmethod
    async def preregister(self, email: str, password: str, is_active: bool) -> User:
        ...

    @abstractmethod
    async def activate(self, token: str) -> User:
        ...

    @abstractmethod
    async def create(
        self, email: str, password: str, role: Roles, is_active: bool
    ) -> User:
        ...
