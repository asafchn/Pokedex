import re
from flask import jsonify

def getImagePath(name: str):
    return (
        # had to switch the image provider, the image provider given was missing too many pokemons.
        f"https://img.pokemondb.net/sprites/home/normal/{normalize_name(name)}.png",
    )

def normalize_name(name: str) -> str:
    # Try to match Mega form like "CharizardMega Charizard Y"
    pattern = r"^([A-Za-z]+)Mega\s+([A-Za-z]+)(?:\s+([A-Z]))?$"
    match = re.match(pattern, name)

    if match:
        base_name = match.group(2).lower()
        return f"{base_name}-mega"

    return name.lower()


def format_error(message: str, status_code: int = 500):
    return jsonify({"status": "error", "message": message}), status_code


def set_cors(app, **kwargs):
    """
    Set CORS for the Flask app.
    :param app: Flask app
    :param resources: CORS resources
    :param origins: Allowed origins
    """
    from flask_cors import CORS

    CORS(
        app,
        **kwargs
    )  