import { Typography, Box } from "@mui/material";
import { Pokemon } from "../types";
import { PokemonTypes } from "./PokemonType";

export function PokemonInfo({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <PokemonTitle number={pokemon.number} name={pokemon.name} />

      <PokemonTypes pokemon={pokemon} />
    </Box>
  );
}

const PokemonTitle = ({ number, name }: { number: number; name: string }) => {
  return (
    <Typography
      variant="subtitle2"
      sx={{
        fontWeight: 600,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
      }}
    >
      #{number.toString().padStart(3, "0")} {name}
    </Typography>
  );
};
