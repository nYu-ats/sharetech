from abc import ABCMeta, abstractmethod
from typing import Dict, List


class TechnoteServiceIF(metaclass=ABCMeta):
    @abstractmethod
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
        ...
