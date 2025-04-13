import { FilterParams } from "./components/Pokedex/types";

export const enum PokemonType {
  None = "",
  Normal = "Normal",
  Fire = "Fire",
  Water = "Water",
  Grass = "Grass",
  Electric = "Electric",
  Ice = "Ice",
  Fighting = "Fighting",
  Poison = "Poison",
  Ground = "Ground",
  Flying = "Flying",
  Psychic = "Psychic",
  Bug = "Bug",
  Rock = "Rock",
  Ghost = "Ghost",
  Dark = "Dark",
  Dragon = "Dragon",
  Steel = "Steel",
  Fairy = "Fairy",
}

export const pokemonTypeList: PokemonType[] = [
  PokemonType.None,
  PokemonType.Normal,
  PokemonType.Fire,
  PokemonType.Water,
  PokemonType.Grass,
  PokemonType.Electric,
  PokemonType.Ice,
  PokemonType.Fighting,
  PokemonType.Poison,
  PokemonType.Ground,
  PokemonType.Flying,
  PokemonType.Psychic,
  PokemonType.Bug,
  PokemonType.Rock,
  PokemonType.Ghost,
  PokemonType.Dark,
  PokemonType.Dragon,
  PokemonType.Steel,
  PokemonType.Fairy,
];

export const pokemonLocalStorageKey = "pokemon-list";

export type LocalStorageList = {
  page: number;
  filters: FilterParams;
  indexToScrollTo: number;
};
