import unittest
from unittest.mock import MagicMock, patch
from servers.pokemon_server.pokemon_db_manager import PokemonDBManager


class TestPokemonDBManager(unittest.TestCase):

    def setUp(self):
        self.db = PokemonDBManager()
        self.db._pokemon_data = [
            {
                "name": "Pikachu",
                "number": 25,
                "type_one": "Electric",
                "type_two": "",
            },
            {
                "name": "Charizard",
                "number": 6,
                "type_one": "Fire",
                "type_two": "Flying",
            },
            {
                "name": "Squirtle",
                "number": 7,
                "type_one": "Water",
                "type_two": "",
            },
        ]
        self.db._search_index = [
            ("pikachu", self.db._pokemon_data[0]),
            ("charizard", self.db._pokemon_data[1]),
            ("squirtle", self.db._pokemon_data[2]),
        ]
        self.db._is_captured_state = {
            "Pikachu": True,
            "Charizard": False,
            "Squirtle": False,
        }
        self.db.populateData = MagicMock()  # prevent real populateData

    @patch("servers.pokemon_server.utils.getImagePath")
    def test_get_page_with_search_and_filter(self, mock_get_image_path):
        url_lambda = (
            lambda name: f"https://img.pokemondb.net/sprites/home/normal/{name.lower()}.png"
        )
        mock_get_image_path.side_effect = url_lambda

        result = self.db.get_page(
            page=0, page_size=2, sort="asc", type_filter="electric", search="pika"
        )

        self.assertEqual(result["total"], 1)
        self.assertEqual(len(result["data"]), 1)

        pokemon = result["data"][0]
        self.assertEqual(pokemon["name"], "Pikachu")
        self.assertEqual(
            pokemon["image_path"],
            ("https://img.pokemondb.net/sprites/home/normal/pikachu.png",),
        )

        self.assertTrue(pokemon["captured"])

    @patch("servers.pokemon_server.utils.getImagePath")
    def test_get_page_with_sort_desc(self, mock_get_image_path):
        mock_get_image_path.return_value = "/img/placeholder.png"

        result = self.db.get_page(
            page=0, page_size=3, sort="desc", type_filter="", search=""
        )

        numbers = [pokemon["number"] for pokemon in result["data"]]
        self.assertEqual(numbers, [25, 7, 6])

    @patch("servers.pokemon_server.utils.getImagePath")
    def test_get_page_with_pagination(self, mock_get_image_path):
        mock_get_image_path.return_value = "/img/placeholder.png"

        result = self.db.get_page(
            page=1, page_size=2, sort="asc", type_filter="", search=""
        )

        self.assertEqual(result["page"], 1)
        self.assertEqual(result["page_size"], 2)
        self.assertEqual(result["total"], 3)
        self.assertEqual(len(result["data"]), 1)
        self.assertEqual(result["data"][0]["name"], "Pikachu")

    def test_mark_pokemon_captured_sets_correct_state(self):
        self.db.mark_pokemon_captured("Charizard", True)
        self.assertTrue(self.db._is_captured_state["Charizard"])

        self.db.mark_pokemon_captured("Pikachu", False)
        self.assertFalse(self.db._is_captured_state["Pikachu"])


if __name__ == "__main__":
    unittest.main()
