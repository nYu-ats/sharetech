from abc import ABCMeta, abstractmethod
from typing import Union

from api.services.user_service.dto import User


class UserServiceIF(metaclass=ABCMeta):
    @abstractmethod
    async def get_user(self) -> Union[User, None]:
        ...

    @abstractmethod
    async def generate_token(self, user_unique_id: str, password: str) -> str:
        ...

    @abstractmethod
    async def deactivate_token(self, user_unique_id: str) -> str:
        ...

    @abstractmethod
    async def update_token_expiration(self, user_unique_id: str) -> str:
        ...
