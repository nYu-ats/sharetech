from api.repositories.mongo.base_entity import BaseEntity
from api.utility.dataclass import DataclassMixin


class OrganizationEntity(DataclassMixin, BaseEntity):
    name: str
    is_active: bool
