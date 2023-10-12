from abc import ABCMeta, abstractmethod
from datetime import datetime
from typing import Union

from api.repositories.mongo.sales_content_access_report_repository.dto import (
    SalesContentAccessReport,
)
from motor.motor_asyncio import AsyncIOMotorCollection


class SalesContentsAccessReportRepositoryIF(metaclass=ABCMeta):
    @abstractmethod
    def _collection(self, organization: str) -> AsyncIOMotorCollection:
        ...

    @abstractmethod
    async def initialize(self, organization: str, sales_content_id: str) -> bool:
        ...

    @abstractmethod
    async def add_history(
        self,
        organization: str,
        sales_content_id: str,
        user_id: str,
        access_datetime: datetime,
    ) -> Union[SalesContentAccessReport, None]:
        ...
