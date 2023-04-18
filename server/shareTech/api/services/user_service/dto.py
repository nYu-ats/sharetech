from dataclasses import dataclass

from api.core.extension.option import UserIconKey
from api.utility.dataclass import DataclassMixin


@dataclass
class User(DataclassMixin):
    id: str
    icon: UserIconKey
    last_name: str
    first_name: str
    user_unique_id: str
    role: str
    organization: str
