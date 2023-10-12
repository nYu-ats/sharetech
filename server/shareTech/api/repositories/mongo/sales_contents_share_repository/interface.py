from abc import ABCMeta, abstractmethod
from typing import List, Union

from api.repositories.mongo.sales_contents_share_repository.dto import (
    SalesContentSharedUser,
)
from motor.motor_asyncio import AsyncIOMotorCollection


class SalesContentsSahreRepositoryIF(metaclass=ABCMeta):
    @abstractmethod
    def _collection(self, organization: str) -> AsyncIOMotorCollection:
        ...

    @abstractmethod
    async def initialize(
        self, organization: str, sales_content_id: str, password: str
    ) -> bool:
        ...

    @abstractmethod
    async def get_users(
        self, organization: str, sales_content_id: str, is_active: bool
    ) -> List[Union[SalesContentSharedUser, None]]:
        ...

    @abstractmethod
    async def add_users(
        self,
        organization: str,
        sales_content_id: str,
        users: List[SalesContentSharedUser],
    ) -> List[Union[SalesContentSharedUser, None]]:
        ...

    @abstractmethod
    async def delete_users(
        self,
        organization: str,
        sales_content_id: str,
        users: List[SalesContentSharedUser],
    ) -> List[Union[SalesContentSharedUser, None]]:
        ...

    @abstractmethod
    async def get_password(
        self, organization: str, sales_content_id: str
    ) -> Union[str, None]:
        ...

    @abstractmethod
    async def update_password(
        self, organization: str, sales_content_id: str, password: str
    ) -> Union[str, None]:
        ...
