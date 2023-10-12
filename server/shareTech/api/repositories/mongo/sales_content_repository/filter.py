from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class SalesContentFilter:
    # TODO 取得fieldの指定もできるようにしたい
    owner_id: List[str] = field(default_factory=list)
    _order_by: str = "created_at"
    _cursor: int = 0
    _limit: int = 20

    def to_query(self) -> Dict:
        query = {
            "$query": {"owner_id": {"$in": self.owner_id}} if self.owner_id else {}
        }
        query["$orderby"] = {self._order_by: -1}
        query["skip"] = self._cursor
        query["limit"] = self._limit

        return query
