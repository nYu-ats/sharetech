import logging
import logging.config
from typing import Dict


class Logger:
    _logger = None

    @classmethod
    def setup(cls, config: Dict[str, str]):
        logging.config.dictConfig(config)
        logger_name = config["loggers"]["shareTech"]["name"]
        cls._logger = logging.getLogger(logger_name)

        return cls

    @classmethod
    def debug(cls, message: str) -> None:
        cls._logger.debug(message)

    @classmethod
    def info(cls, message: str) -> None:
        cls._logger.info(message)

    @classmethod
    def warning(cls, message: str) -> None:
        cls._logger.warning(message)

    @classmethod
    def error(cls, message: str) -> None:
        cls._logger.error(message)

    @classmethod
    def get_child(cls, name: str):
        return cls._logger.getChild(name)
