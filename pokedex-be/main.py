from servers.pokemon_server.pokemon_server import PokemonServer

if __name__ == "__main__":
    server = PokemonServer(port=8080, debug_flask=True)
    server.start(enable_local_cors=True)