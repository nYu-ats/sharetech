from api.core.extension.option import Roles
from api.repositories.mongo.base_entity import BaseEntity
from api.utility.dataclass import DataclassMixin


class UserEntity(DataclassMixin, BaseEntity):
    email: str
    password: str
    role: Roles
    organization_id: str
    is_active: bool
