from abc import ABCMeta, abstractmethod
from typing import List, Union

from api.services.sales_content_service.dto import (
    SalesContentDbDto,
    SalesContentDto,
    SalesContentSharedUserDto,
)


class SalesContentServiceIF(metaclass=ABCMeta):
    @abstractmethod
    async def find_by_id(
        self, organization: str, id: str
    ) -> Union[SalesContentDbDto, None]:
        ...

    @abstractmethod
    async def list(
        self,
        organization: str,
        owner_id: List[str] = [],
        _order_by: str = "created_at",
        _cursor: int = 0,
        _limit: int = 20,
    ) -> List[Union[SalesContentDbDto, None]]:
        ...

    @abstractmethod
    async def create(
        self, organization: str, sales_content: SalesContentDto
    ) -> Union[SalesContentDbDto, None]:
        ...

    @abstractmethod
    async def update_one(
        self, organization: str, content_id: str, sales_content: SalesContentDto
    ) -> Union[SalesContentDbDto, None]:
        ...

    @abstractmethod
    async def get_shared_users(
        self, organization: str, content_id: str, is_active: bool
    ) -> List[Union[SalesContentSharedUserDto, None]]:
        ...

    @abstractmethod
    async def update_shared_users(
        self, organization: str, content_id: str, users: List[SalesContentSharedUserDto]
    ) -> List[Union[SalesContentSharedUserDto, None]]:
        ...

    @abstractmethod
    async def get_password(
        self, organization: str, content_id: str
    ) -> Union[str, None]:
        ...

    @abstractmethod
    async def update_password(
        self, organization: str, content_id: str, password: str
    ) -> Union[str, None]:
        ...
