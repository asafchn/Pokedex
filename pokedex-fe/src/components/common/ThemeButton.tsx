import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { FC } from "react";
import { ThemeMode } from "../../themeSlice/slice";
import { useAppTheme } from "../../themeSlice/hooks";

interface ThemeToggleButtonProps {
  mode: ThemeMode;
  onClick: () => void;
}

export const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({
  mode,
  onClick,
}) => {
  const theme = useAppTheme();
  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={onClick}
        size="large"
        color="inherit"
        sx={{
          padding: 1,
          color: theme.themeBtnColor,
          height: "fit-content",
          width: "fit-content",
          border: "none",
        }}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};
