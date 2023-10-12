from dataclasses import dataclass

from api.utility.dataclass import DataclassMixin


@dataclass
class StoredData(DataclassMixin):
    key: str
    value: str
