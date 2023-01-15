import asyncio
import random
import string
import time

from api.utility.logging import LoggerWrapper as Logger
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.status import HTTP_504_GATEWAY_TIMEOUT
from starlette.types import ASGIApp


class TimeoutMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, timeout: int = 30) -> None:
        super().__init__(app)
        self.timeout = timeout
        self.logger = Logger

    async def dispatch(self, request, call_next) -> JSONResponse:
        try:
            id = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
            self.logger.info(f"[req_id:{id}]{request.url.path+'&'+request.url.query}")
            exec_start = time.time()
            response = await asyncio.wait_for(call_next(request), timeout=self.timeout)
            return response
        except asyncio.TimeoutError:
            self.logger.error(f"[req_id:{id}]Request timeout: {request}")
            return JSONResponse(
                status_code=HTTP_504_GATEWAY_TIMEOUT,
                content={"detail": [{"message": "Request Timeout"}]},
            )
        except Exception as e:
            self.logger.error(f"[req_id:{id}]{e}")
            raise e
        finally:
            self.logger.info(
                f"[req_id:{id}]"
                f"[status_code:{response.status_code}]"
                f"processed {'{0:.4f}'.format(time.time() - exec_start)}ms"
            )
