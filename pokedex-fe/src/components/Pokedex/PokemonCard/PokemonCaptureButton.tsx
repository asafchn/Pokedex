import { IconButton, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";

import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useCapturePokemonMutation } from "../../../pokemonApi/api";
import { Pokemon } from "../types";
import { pokemonCapturedButton } from "./styles";
import { useAppTheme } from "../../../themeSlice/hooks";

export function PokemonCaptureButton({ pokemon }: { pokemon: Pokemon }) {
  const [captured, setCaptured] = useState(!!pokemon.captured);
  const [capturePokemon] = useCapturePokemonMutation();
  const handleCaptureClick = () => {
    const next = !captured;
    setCaptured(next);
    capturePokemon({ name: pokemon.name, isCaptured: next });
  };
  const theme = useAppTheme();
  const capturedButtonStyles = useMemo(() => {
    return pokemonCapturedButton(captured, theme);
  }, [captured, theme]);
  return (
    <Tooltip title={captured ? "Captured" : "Mark as captured"}>
      <IconButton onClick={handleCaptureClick} sx={capturedButtonStyles}>
        <CatchingPokemonIcon />
      </IconButton>
    </Tooltip>
  );
}
