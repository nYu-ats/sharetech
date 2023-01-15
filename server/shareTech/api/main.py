import os

from api.core.middleware.timeout_middleware import TimeoutMiddleware
from api.endpoint.technote import router as technote_router
from api.utility.config import Config
from api.utility.logging import LoggerWrapper as Logger
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def create_app():
    config = Config.load()
    logger = Logger.setup(config["logging"])
    logger.info(f"Running application [{os.environ['ENV']}]")

    app = FastAPI()
    app.router.prefix = "/api/v1"
    app.include_router(technote_router)
    app.add_middleware(TimeoutMiddleware, timeout=30)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT"],
        allow_headers=["*"],
    )

    return app, logger


app, logger = create_app()
