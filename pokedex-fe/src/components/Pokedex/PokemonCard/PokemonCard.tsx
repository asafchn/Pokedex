import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Pokemon } from "../types";
import { Stats } from "./Stats";
import { ImageComponent } from "../../common/ImageComponent/ImageComponent";
import { PokemonInfo } from "./PokemonInfo";
import { pokemonCardContainer } from "./styles";
import { PokemonCaptureButton } from "./PokemonCaptureButton";
import { useAppTheme } from "../../../themeSlice/hooks";

type Props = {
  pokemon: Pokemon;
  cardHeight: number;
};

export default function PokemonCard({ pokemon, cardHeight }: Props) {
  const theme = useAppTheme();
  return (
    <Box sx={pokemonCardContainer(cardHeight, theme)}>
      <ImageComponent
        containerHeight={cardHeight}
        name={pokemon.name}
        imagePath={pokemon.image_path}
      />
      <PokemonDataContainer>
        <PokemonInfo pokemon={pokemon} />
        <Stats pokemon={pokemon} />
      </PokemonDataContainer>
      <PokemonCaptureButton pokemon={pokemon} />
    </Box>
  );
}
// just to make the code a bit nicer to read
const PokemonDataContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        maxWidth: " 80%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      {children}
    </Box>
  );
};
