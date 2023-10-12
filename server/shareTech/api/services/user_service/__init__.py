import traceback
import uuid
from datetime import datetime, timedelta
from typing import Union

from api.core.context import app_context
from api.core.context.config import Config
from api.core.context.logging import Logger
from api.core.extension.exception import (
    ActivateTokenException,
    DatabaseException,
    InternalServerException,
    UserDuplicateException,
)
from api.core.extension.option import Roles
from api.repositories.mongo.activation_token_repository import ActivationTokenRepository
from api.repositories.mongo.activation_token_repository.interface import (
    ActivationTokenRepositoryIF,
)
from api.repositories.mongo.organization_repository import OrganizationRepository
from api.repositories.mongo.organization_repository.interface import (
    OrganizationRepositoryIF,
)
from api.repositories.mongo.user_repository import UserRepository
from api.repositories.mongo.user_repository.interface import UserRepositoryIF
from api.services.user_service.dto import User
from api.services.user_service.interface import UserServiceIF
from api.utility.email import EmailUtil
from api.utility.hasher import Hasher
from fastapi import Depends


class UserService(UserServiceIF):
    def __init__(
        self,
        user_repository: UserRepositoryIF = Depends(UserRepository),
        organization_repository: OrganizationRepositoryIF = Depends(
            OrganizationRepository
        ),
        activation_token_repository: ActivationTokenRepositoryIF = Depends(
            ActivationTokenRepository
        ),
        app_config: Config = Depends(app_context.config_provider),
        logger: Logger = Depends(app_context.logger_provider(__name__)),
    ):
        self._user_repository = user_repository
        self._organization_repository = organization_repository
        self._activation_token_repository = activation_token_repository
        self._app_config = app_config
        self.logger = logger

    async def get_db_user(self, organization: str, email: str) -> Union[User, None]:
        try:
            user_entity = await self._user_repository.find_by_email(organization, email)
            return User(
                id=user_entity._id,
                email=user_entity.email,
                role=user_entity.role,
                organization=organization,
            )
        except DatabaseException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def preregister(
        self, email: str, password: str, is_active: bool = False
    ) -> User:
        organization = EmailUtil.extract_domain(email)
        hashed_password = Hasher.get_hash(password)
        org_id = ""
        role = ""

        try:
            registered_org = await self._organization_repository.find_by_name(
                organization
            )
            if registered_org:
                self.logger.debug(f"{organization} has alresdy registered.")
                if await self._user_repository.find_by_email(organization, email):
                    self.logger.warning(f"{email} has already exist in {organization}")
                    raise UserDuplicateException()
                org_id = registered_org._id
                role = Roles.ADMIN.value
            else:
                self.logger.debug(f"{organization} does not exist.")
                registered_org = await self._organization_repository.create(
                    organization, False
                )
                org_id = registered_org._id
                role = Roles.ORGANIZATION_ADMIN.value

            registered_user = await self._user_repository.create(
                organization,
                org_id,
                email,
                hashed_password,
                role,
                is_active,
            )

            activation_token = await self._activation_token_repository.create(
                str(uuid.uuid4()),
                registered_user._id,
                org_id,
                (datetime.now() + timedelta(minutes=30)),
            )

            await EmailUtil.send_preregister_message(
                self._app_config["app"]["user_activation_url"].format(
                    activation_token.token
                )
            )

            return User(
                id=registered_user._id,
                email=email,
                role=role,
                organization=organization,
            )
        except DatabaseException as e:
            raise e
        except UserDuplicateException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def activate(self, token: str) -> User:
        try:
            activation_token = await self._activation_token_repository.find_by_token(
                token
            )
            if not activation_token or (
                datetime.now() > activation_token.expiration_datetime
            ):
                raise ActivateTokenException()

            organization = await self._organization_repository.set_active(
                activation_token.organization_id
            )
            user = await self._user_repository.set_active(
                organization.name, activation_token.user_id
            )
            await self._activation_token_repository.delete(token)

            return User(
                id=user._id,
                email=user.email,
                role=user.role,
                organization=organization.name,
            )
        except DatabaseException as e:
            raise e
        except ActivateTokenException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)

    async def create(
        self,
        email: str,
        password: str,
        role: str = Roles.COLLABORATOR_VIEWER.value,
        is_active: bool = False,
    ) -> User:
        organization = EmailUtil.extract_domain(email)
        hashed_password = Hasher.get_hash(password)
        org_id = ""

        try:
            registered_org = await self._organization_repository.find_by_name(
                organization
            )
            if registered_org:
                self.logger.debug(f"{organization} has alresdy registered.")
                if await self._user_repository.find_by_email(organization, email):
                    self.logger.warning(f"{email} has already exist in {organization}")
                    raise UserDuplicateException()
                org_id = registered_org._id
            else:
                self.logger.debug(f"{organization} does not exist.")
                registered_org = await self._organization_repository.create(
                    organization, False
                )
                org_id = registered_org._id

            registered_user = await self._user_repository.create(
                organization,
                org_id,
                email,
                hashed_password,
                role,
                is_active,
            )
            return User(
                id=registered_user._id,
                email=email,
                role=role,
                organization=organization,
            )
        except DatabaseException as e:
            raise e
        except UserDuplicateException as e:
            raise e
        except Exception:
            stack_trace = traceback.format_exc()
            self.logger.debug(stack_trace)
            raise InternalServerException(detail=stack_trace)
