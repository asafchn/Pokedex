from base_classes.abstract_db_manager import AbstractDBManager
from flask_cors import CORS
from flask import Flask, Blueprint
from typing import List


class FlaskServer:
    """
    Abstract base class for a server that maintains state.
    """

    def __init__(self, blueprints: List[Blueprint], db_manager: AbstractDBManager = None, port = 8080, debug_flask=True):
        self._app = Flask(__name__)
        self._blueprints = blueprints
        self._port = port
        self._debug_flask = debug_flask
        if db_manager:
            self._app.config["db_manager"] = db_manager

    def start(self, enable_local_cors=False):
        if enable_local_cors:
            CORS(self._app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})
        if self._app.config["db_manager"]:
            self._app.config["db_manager"].connect()
        for blueprint in self._blueprints:
            self._app.register_blueprint(blueprint)
        self._app.run(port=self._port, debug=True)
