from abc import ABC, abstractmethod


class AbstractDBManager(ABC):
    """
    Abstract base class for a database manager.
    """

    @abstractmethod
    def connect(self):
        """Connect to the database."""
        pass

    @abstractmethod
    def disconnect(self):
        """Disconnect from the database."""
        pass
    
    @abstractmethod
    def get_page(self, page: int, page_size: int, sort: str, type_filter: str, search: str):
        """Get paginated result from the database."""
        pass
