import { SxProps } from "@mui/material";

import { AppTheme } from "../../../helpers/ColorTheme";

export const container: (
  height: number,
  theme: AppTheme,
  width: string
) => SxProps = (height, theme, width) => {
  return {
    height: `${height}px`,
    width: width,
    overflowY: "auto",
    borderRadius: "16px",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    scrollbarColor: theme.scrollbarColor,
  };
};

export const virtualItem = (rowstart: number) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    transform: `translateY(${rowstart}px)`,
  };
};
