export const POKEMON_TYPE_COLORS: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  // fallback
  default: "#ccc",
};

export const headerHeight = 230;
export const cardRenderHeight = 135;

export const cardYPadding = 16;

export const calcHeight = (windowHeight: number) =>
  Math.floor((windowHeight - headerHeight) * 0.9);

export const baseItemVisualizedOnScreen = 4;

export const pageSize = 15;

export const staticCardGap = 8;
