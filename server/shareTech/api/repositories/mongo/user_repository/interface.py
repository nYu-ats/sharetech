from abc import ABCMeta, abstractmethod
from typing import Union

from api.repositories.mongo.user_repository.entity import UserEntity


class UserRepositoryIF(metaclass=ABCMeta):
    @abstractmethod
    async def find_by_user_unique_id(self, id: str) -> Union[UserEntity, None]:
        ...
