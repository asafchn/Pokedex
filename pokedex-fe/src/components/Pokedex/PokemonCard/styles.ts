import { SxProps } from "@mui/material";
import { AppTheme } from "../../../helpers/ColorTheme";

export const pokemonCardContainer: (
  cardHeight: number,
  theme: AppTheme
) => SxProps = (cardHeight, theme) => {
  const paddingTopButtomEstimatedSize = 32;
  return {
    height: `${cardHeight}px`,
    display: "flex",
    alignItems: "center",
    gap: 2,
    px: 2,
    paddingTop: 1,
    backgroundColor: theme.cardColor,
    color: theme.textColor,
    borderRadius: 2,
    boxShadow: 1,
    overflow: "hidden",
  };
};

export const linearProgress: (theme: AppTheme) => SxProps = (theme) => {
  return {
    height: 6,
    borderRadius: 1,
    flex: 1,

    backgroundColor: theme.statsBackground,
    "& .MuiLinearProgress-bar": {
      background: theme.statGradient,
    },
  };
};

export const statLabels: SxProps = {
  minWidth: 58,
  display: "flex",
  justifyContent: "space-between",
};
export const labelCss: SxProps = {
  fontWeight: 500,
};
export const statBarWrapper: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  width: "100%",
  flexWrap: "wrap",
};

export const pokemonCapturedButton: (
  captured: boolean,
  theme: AppTheme
) => SxProps = (captured, theme) => {
  return {
    position: "relative",
    right: 8,
    svg: {
      fill: captured ? `${theme.accentColor}` : `${theme.textColor}`,
    },
  };
};
