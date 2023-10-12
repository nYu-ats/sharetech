from api.repositories.mongo.base_entity import BaseEntity
from api.utility.dataclass import DataclassMixin


class SalesContentSharedUser(DataclassMixin, BaseEntity):
    user_id: str
    is_active: bool
