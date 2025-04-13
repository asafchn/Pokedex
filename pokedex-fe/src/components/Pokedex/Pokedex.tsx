import { Box } from "@mui/material";
import { container } from "./styles";
import { PokemonFilter } from "./PokemonFilter/PokemonFilter";
import { useAppTheme } from "../../themeSlice/hooks";
import { Header } from "./Header";
import PokemonList from "./PokemonList";

export default function Pokedex() {
  const theme = useAppTheme();
  return (
    <Box sx={container(theme)}>
      <Header />
      <PokemonFilter />
      <PokemonList />
    </Box>
  );
}
