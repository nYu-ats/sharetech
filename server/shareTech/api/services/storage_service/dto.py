from dataclasses import dataclass
from datetime import datetime
from typing import Dict, List

from api.core.extension.option import AllowedStorageMethod
from api.utility.dataclass import DataclassMixin


@dataclass
class StorageSignedUrl(DataclassMixin):
    allowd_method: AllowedStorageMethod
    urls: List[Dict[str, str]]
    expiration: datetime
