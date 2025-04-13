from base_classes.abstract_db_manager import AbstractDBManager
from servers.pokemon_server.db import get
from rapidfuzz import fuzz
from servers.pokemon_server.utils import getImagePath


class PokemonDBManager(AbstractDBManager):
    """
    A concrete implementation of AbstractDBManager for managing Pokémon data.
    """

    def __init__(self):
        self._pokemon_data: dict = {}
        self._is_captured_state: dict[str, bool] = (
            {}
        )  # Pokemon name(unique id) to is_captured (true/false)
        self._search_index: list = []

    def populateData(self):
        self._pokemon_data = get()
        for pokemon in self._pokemon_data:
            search_index = " ".join(
                [
                    str(pokemon.get("name", "")).lower(),
                    str(pokemon.get("number", "")).lower(),
                    str(pokemon.get("type_one", "")).lower(),
                    str(pokemon.get("type_two", "")).lower(),
                ]
            ).lower()
            # Creating search index will make our fuzzy search a lot faster
            self._search_index.append((search_index, pokemon))

    def connect(self):
        """Connect to the database."""

    def disconnect(self):
        """Disconnect from the database."""
        self._is_captured_state = None
        self._search_index = None

    def get_page(
        self, page: int, page_size: int, sort: str, type_filter: str, search: str
    ):
        """Since PokemonDBManager uses a static dataset, we can simulate pagination."""
        self.populateData()
        results = []

        if search:
            search = search.lower()
            fuzzy_results = [
                pokemon
                for search_index, pokemon in self._search_index
                if fuzz.partial_ratio(search, search_index) > 80
            ]
            # removing fuzzy search duplications
            results = {pokemon["number"]: pokemon for pokemon in fuzzy_results}.values()
        else:
            results = self._pokemon_data

        # Apply filter
        if type_filter:
            type_filter = type_filter.lower()
            results = [
                pokemon
                for pokemon in results
                if type_filter
                in (
                    pokemon.get("type_one", "").lower(),
                    (pokemon.get("type_two", "")).lower(),
                )
            ]

        # Apply sort
        if sort:
            should_reverse = sort == "desc"
            results = sorted(results, key=lambda x: x["number"], reverse=should_reverse)

        # Calculate page
        total_count = len(results)
        start = (page) * page_size
        end = start + page_size
        results = results[start:end]
        # Apply enrichment of image_path and capture state
        for result in results:
            result["image_path"] = getImagePath(result["name"])
            result["captured"] = self._is_captured_state.get(result["name"], False)

        # Return page
        return {
            "data": results,
            "page": page,
            "page_size": page_size,
            "total": total_count,
        }

    def mark_pokemon_captured(self, name: str, capture_state: bool):
        """Mark a Pokémon as captured."""
        self._is_captured_state[name] = capture_state
