from abc import ABCMeta, abstractmethod
from datetime import datetime
from typing import Union

from api.repositories.mongo.activation_token_repository.entity import (
    ActivationTokenEntity,
)


class ActivationTokenRepositoryIF(metaclass=ABCMeta):
    @abstractmethod
    async def find_by_token(self, token: str) -> Union[ActivationTokenEntity, None]:
        ...

    @abstractmethod
    async def create(
        self,
        token: str,
        user_id: str,
        expiration_datetime: datetime,
        organization_id: str,
    ) -> ActivationTokenEntity:
        ...

    @abstractmethod
    async def delete(
        self,
        token: str,
    ) -> None:
        ...
