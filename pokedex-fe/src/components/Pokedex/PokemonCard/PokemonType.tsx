import { POKEMON_TYPE_COLORS } from "../consts";
import { Pokemon } from "../types";
import { Box, Chip } from "@mui/material";
export function PokemonTypes({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      <Chip
        size="small"
        label={pokemon.type_one}
        sx={{
          backgroundColor: getTypeColor(pokemon.type_one),
          color: "#fff",
          textTransform: "capitalize",
        }}
      />
      {pokemon.type_two && (
        <Chip
          size="small"
          label={pokemon.type_two}
          sx={{
            backgroundColor: getTypeColor(pokemon.type_two),
            color: "#fff",
            textTransform: "capitalize",
          }}
        />
      )}
    </Box>
  );
}

const getTypeColor = (type: string) =>
  POKEMON_TYPE_COLORS[type.toLowerCase()] || POKEMON_TYPE_COLORS.default;
