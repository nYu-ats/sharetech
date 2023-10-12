from abc import ABCMeta, abstractmethod
from typing import Union

from api.repositories.mongo.organization_repository.entity import OrganizationEntity


class OrganizationRepositoryIF(metaclass=ABCMeta):
    @abstractmethod
    async def find_by_id(self, id: str) -> Union[OrganizationEntity, None]:
        ...

    @abstractmethod
    async def find_by_name(self, name: str) -> Union[OrganizationEntity, None]:
        ...

    @abstractmethod
    async def create(self, name: str, is_active: bool) -> OrganizationEntity:
        ...

    @abstractmethod
    async def set_active(self, id: str) -> OrganizationEntity:
        ...
