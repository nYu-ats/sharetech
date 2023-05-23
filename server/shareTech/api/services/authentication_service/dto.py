from dataclasses import dataclass

from api.core.extension.option import Roles
from api.utility.dataclass import DataclassMixin


@dataclass
class CurrentActiveUser(DataclassMixin):
    email: str
    role: Roles
    organization: str
