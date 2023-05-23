from api.core.context.config import Config
from api.core.context.connection_pool.mongodb import MongoDb
from api.core.context.connection_pool.redis import Redis
from api.core.context.logging import Logger


class AppContext:
    def __init__(self):
        self._logger = None
        self._mongo_db = None
        self._redis = None
        self._config = None

    def initialize(self, config: Config):
        self._config = config
        self._logger = Logger.setup(config["logging"])
        logger = self._logger.get_child(__name__)

        logger.info("Initialize MongoDb")
        self._mongo_db = MongoDb(config["mongo"]).get_connection()

        logger.info("Initialize Redis")
        self._redis = Redis(config["redis"]).get_connection()

    def get_logger(self, name: str = "app_context"):
        return self._logger.get_child(name)

    def logger_provider(self, name: str = "app_context"):
        # DI時、factory関数に引数を渡すため、一度引数を受け取り
        # その上でinner関数を返却する
        def provide():
            return self._logger.get_child(name)

        return provide

    def mongo_db_provider(self):
        return self._mongo_db

    def redis_provider(self):
        return self._redis

    def config_provider(self):
        return self._config


app_context = AppContext()
