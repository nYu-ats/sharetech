import os

from api.core.context import app_context
from api.core.context.config import config
from api.core.middleware.timeout_middleware import TimeoutMiddleware
from api.endpoint.auth import auth_router
from api.endpoint.sales_content_resource import sales_content_router
from api.endpoint.user_resource import user_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def initialize_app():
    allow_origins = ["http://localhost:3030"]
    app_context.initialize(config)
    logger = app_context.get_logger(__name__)
    logger.info(f"Running application [{os.environ['ENV']}]")

    app = FastAPI()
    app.router.prefix = "/api/v1"
    for router in [user_router, auth_router, sales_content_router]:
        app.include_router(router)

    app.add_middleware(TimeoutMiddleware, timeout=config["app"]["timeout"])
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allow_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH"],
        allow_headers=["*"],
    )

    return app


app = initialize_app()
