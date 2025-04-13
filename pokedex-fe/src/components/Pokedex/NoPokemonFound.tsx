import React from "react";
import {
  Box,
  Typography,
  Button,
  SxProps,
  CircularProgress,
} from "@mui/material";
import { AppTheme } from "../../helpers/ColorTheme";
import { useAppTheme } from "../../themeSlice/hooks";
import { useSelectIsFetching } from "../../performanceSlice/hooks";

interface NoPokemonFoundProps {
  containerHeight: number;
  onResetFilters?: () => void;
}

const NoPokemonFound: React.FC<NoPokemonFoundProps> = ({
  containerHeight,
  onResetFilters,
}) => {
  const theme = useAppTheme();
  const isFetching = useSelectIsFetching();
  const text = isFetching
    ? ""
    : "No Pokémon found matching the current filters.";
  return (
    <Box sx={noPokemonContainer(containerHeight, theme)}>
      <Typography sx={noPokemonMessage(theme)}>{text}</Typography>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          sx={resetButton(theme)}
          onClick={onResetFilters}
        >
          Reset Filters
        </Button>
      )}
    </Box>
  );
};

export default NoPokemonFound;
const noPokemonContainer: (height: number, theme: AppTheme) => SxProps = (
  height,
  theme
) => {
  return {
    height: `${height}px`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.cardColor,
    color: theme.textColor,
    borderRadius: 2,
    gap: 2,
    px: 2,
  };
};

const noPokemonMessage: (theme: AppTheme) => SxProps = (theme) => {
  return {
    fontSize: "1.1rem",
    color: theme.textColor,
    mb: 2,
    textAlign: "center",
  };
};

const resetButton: (theme: AppTheme) => SxProps = (theme) => {
  return {
    backgroundColor: theme.accentColor,
    color: theme.textColor,
    ":hover": {
      backgroundColor: theme.accentColor,
      opacity: 0.9,
    },
  };
};
