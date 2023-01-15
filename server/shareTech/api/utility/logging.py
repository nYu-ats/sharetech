import logging
import logging.config
from typing import Dict


class LoggerWrapper:
    logger = None

    @classmethod
    def setup(cls, config: Dict[str, str]):
        logging.config.dictConfig(config)
        logger_name = config["loggers"]["shareTech"]["name"]
        cls.logger = logging.getLogger(logger_name)

        return cls

    @classmethod
    def debug(cls, message: str) -> None:
        cls.logger.debug(message)

    @classmethod
    def info(cls, message: str) -> None:
        cls.logger.info(message)

    @classmethod
    def warning(cls, message: str) -> None:
        cls.logger.warning(message)

    @classmethod
    def error(cls, message: str) -> None:
        cls.logger.error(message)
