from dataclasses import dataclass

from api.utility.dataclass import DataclassMixin


@dataclass
class SalesContentSharedUser(DataclassMixin):
    organization: str
    user_id: str
    is_active: bool
