from datetime import datetime

from api.repositories.mongo.base_entity import BaseEntity
from api.utility.dataclass import DataclassMixin


class ActivationTokenEntity(DataclassMixin, BaseEntity):
    token: str
    expiration_datetime: datetime
    user_id: str
    organization_id: str
