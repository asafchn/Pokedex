from base_classes.flask_server import FlaskServer
from servers.pokemon_server.pokemon_db_manager import PokemonDBManager
from servers.pokemon_server.blueprint_pokemon import get_blueprint_pokemon

class PokemonServer(FlaskServer):
    """
    A server for managing Pokémon data.
    """

    def __init__(self, port=8080, debug_flask=True):
        db = PokemonDBManager()
        super().__init__([get_blueprint_pokemon()], db, port, debug_flask)
    