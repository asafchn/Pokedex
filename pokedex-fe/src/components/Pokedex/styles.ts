import { SxProps } from "@mui/material";
import { AppTheme } from "../../helpers/ColorTheme";

export const container: (theme: AppTheme) => SxProps = (theme) => {
  return {
    roundColor: theme.bgColor,
    color: theme.textColor,
    transition: "background-color 0.2s ease, color 0.2s ease",
    padding: "2rem",
    margin: "0",
  };
};
