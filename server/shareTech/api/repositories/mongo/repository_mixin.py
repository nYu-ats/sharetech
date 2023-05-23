from datetime import datetime


class RepositoryMixin:
    def generate_initial_state(self, create_by: str = "Anonymous"):
        return {
            "created_at": datetime.now(),
            "created_by": create_by,
            "updated_at": None,
            "updated_by": None,
            "deleted_at": None,
            "deleted_by": None,
        }
