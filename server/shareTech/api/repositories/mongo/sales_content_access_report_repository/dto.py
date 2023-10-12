from dataclasses import dataclass
from datetime import datetime
from typing import List

from api.utility.dataclass import DataclassMixin


@dataclass
class AccessHistory(DataclassMixin):
    user_id: str
    access_datetime: datetime


@dataclass
class SalesContentAccessReport(DataclassMixin):
    organization: str
    content_id: str
    access_historis: List[AccessHistory]
