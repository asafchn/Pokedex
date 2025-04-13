import { GlobalStyles } from "@mui/material";
import "./App.css";
import Pokedex from "./components/Pokedex/Pokedex";
import { useAppTheme } from "./themeSlice/hooks";

function App() {
  const theme = useAppTheme();
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: `${theme.bgColor}`,
            color: `${theme.textColor}`,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flex: "1",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      />
      <Pokedex />
    </>
  );
}

export default App;
