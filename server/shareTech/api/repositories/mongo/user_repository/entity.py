from api.core.extension.option import UserIconKey
from api.repositories.mongo.base_entity import BaseEntity
from api.utility.dataclass import DataclassMixin


class UserEntity(DataclassMixin, BaseEntity):
    _id: str
    icon: UserIconKey
    last_name: str
    first_name: str
    user_unique_id: str
    password: str
    role: str
    organization: str
