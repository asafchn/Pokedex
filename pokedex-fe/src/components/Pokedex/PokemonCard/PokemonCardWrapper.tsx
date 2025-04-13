import { Pokemon } from "../types";
import PokemonCard from "./PokemonCard";
import PokemonCardSkeleton from "./PokemonCardSkelaton/PokemonCardSkelaton";

export function PokemonCardWrapper({
  pokemon,
  cardSize,
}: {
  pokemon: Pokemon | undefined;
  cardSize: number;
}) {
  if (!pokemon) {
    return <PokemonCardSkeleton cardHeight={cardSize} />;
  } else {
    return <PokemonCard pokemon={pokemon} cardHeight={cardSize} />;
  }
}
