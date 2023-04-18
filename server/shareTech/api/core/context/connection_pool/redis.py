from typing import Dict

from redis import Redis as RedisClient


class Redis:
    def __init__(self, config: Dict):
        self.host = config["host"]
        self.port = config["port"]
        self._connection = None

    def _connect(self) -> None:
        if not self._connection:
            self._connection = RedisClient(host=self.host, port=self.port, db=0)

    def get_connection(self) -> RedisClient:
        if not self._connection:
            self._connect()

        return self._connection
