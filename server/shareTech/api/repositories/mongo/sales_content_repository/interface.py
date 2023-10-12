from abc import ABCMeta, abstractmethod
from typing import List, Union

from api.repositories.mongo.sales_content_repository.dto import SalesContentDto
from api.repositories.mongo.sales_content_repository.entity import SalesContentEntity
from api.repositories.mongo.sales_content_repository.filter import SalesContentFilter
from motor.motor_asyncio import AsyncIOMotorCollection


class SalesContentsRepositoryIF(metaclass=ABCMeta):
    @abstractmethod
    def _collection(self, organization: str) -> AsyncIOMotorCollection:
        ...

    @abstractmethod
    async def find_by_id(
        self, organization: str, id: str
    ) -> Union[SalesContentEntity, None]:
        ...

    @abstractmethod
    async def filter(
        self, organization: str, filter: SalesContentFilter
    ) -> List[Union[SalesContentEntity, None]]:
        ...

    @abstractmethod
    async def create(
        self, organization: str, sales_content: SalesContentDto
    ) -> SalesContentEntity:
        ...

    @abstractmethod
    async def update_one(
        self, organization: str, content_id: str, sales_content: SalesContentDto
    ) -> SalesContentEntity:
        ...
