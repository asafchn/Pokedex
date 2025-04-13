from flask import Blueprint, Response, request, jsonify, current_app
from servers.pokemon_server.pokemon_db_manager import PokemonDBManager
from servers.pokemon_server.utils import format_error
from marshmallow import Schema, fields, ValidationError


class GetPaginatedResult(Schema):
    page = fields.Int(required=True)
    page_size = fields.Int(required=True)
    sort = fields.Str(default="asc")
    type = fields.Str()
    search = fields.Str()


class CapturePokemon(Schema):
    name = fields.Str(required=True)
    isCaptured = fields.Bool(required=True)


def get_blueprint_pokemon() -> Blueprint:
    blueprint_pokemon = Blueprint("blueprint_pokemon", __name__)

    @blueprint_pokemon.route("/pokemons")
    def pokemons() -> Response:
        try:
            schema = GetPaginatedResult()
            db_manager = current_app.config.get("db_manager")
            if not isinstance(db_manager, PokemonDBManager):
                return format_error("Internal server error - failed db connection", 500)
            try:
                args = schema.load(request.args.to_dict())
            except ValidationError as err:
                return format_error(f"Invalid request parameters: {err.messages}", 400)

            result = db_manager.get_page(
                page=args.get("page"),
                page_size=args.get("page_size"),
                sort=args.get("sort"),
                type_filter=args.get("type"),
                search=args.get("search"),
            )
            return jsonify(result)
        except Exception as e:
            return format_error(f"Failed to fetch Pokémon list: {str(e)}")

    @blueprint_pokemon.route("/pokemon/capture", methods=["POST"])
    def capture():
        try:
            schema = CapturePokemon()
            db_manager = current_app.config.get("db_manager")
            if not isinstance(db_manager, PokemonDBManager):
                return format_error("Internal server error - failed db connection", 500)
            try:
                args = schema.load(request.get_json())
            except ValidationError as err:
                return format_error(f"Invalid request parameters: {err.messages}", 400)
            db_manager.mark_pokemon_captured(args["name"], args["isCaptured"])
            return jsonify({"status": "ok", "captured": args["name"]})
        except Exception as e:
            return format_error(f"Failed to mark Pokémon as captured: {str(e)}")

    return blueprint_pokemon
