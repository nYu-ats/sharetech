from enum import Enum


class Roles(Enum):

    ORGANIZATION_ADMIN = "ORGANIZATION_ADMIN"
    ADMIN = "ADMIN"
    COLLABORATOR_EDITOR = "COLLABORATOR_EDITOR"
    COLLABORATOR_VIEWER = "COLLABORATOR_VIEWER"


class SalesContentType(Enum):
    PDF = "PDF"
    MOVIE = "MOVIE"
    TEXT = "TEXT"
    STEP = "STEP"


class AllowedStorageMethod(Enum):
    GET = "GET"
    PUT = "PUT"


class StorageType(Enum):
    UPLOAD = "UPLOAD"
    PREVIEW = "PREVIEW"
    DISTRIBUTION = "DISTRIBUTION"
