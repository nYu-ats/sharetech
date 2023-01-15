from typing import Dict, List

from api.service.interface import TechnoteServiceIF
from api.utility.logging import LoggerWrapper as Logger

logger = Logger


class TechnoteService(TechnoteServiceIF):
    def list(
        self,
        tag: List[str],
        author: List[str],
        keyword: List[str],
        _fields: str,
        _order_by: str,
        _cursor: str,
        _limit: str,
    ) -> Dict[str, any]:
        return {"test": "test"}
