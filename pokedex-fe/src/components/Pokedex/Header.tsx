import { Stack, Typography } from "@mui/material";
import { ThemeToggleButton } from "../common/ThemeButton";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../../themeSlice/selectors";
import { useChangeTheme } from "../../themeSlice/hooks";
import { getBrowserThemeType } from "../../helpers/getTheme";
import { ThemeMode } from "../../themeSlice/slice";
import { useCallback } from "react";
import PerformanceToggle from "../common/PerformanceToggle";

export function Header() {
  const mode = useSelector(selectThemeMode);
  const changeTheme = useChangeTheme();
  function changeThemeByCurrentTheme(theme: ThemeMode) {
    if (theme === "light") {
      changeTheme("dark");
    } else {
      changeTheme("light");
    }
  }
  const handleChangeTheme = useCallback(() => {
    if (mode === "system") {
      const systemTheme = getBrowserThemeType();
      changeThemeByCurrentTheme(systemTheme);
      return;
    }
    changeThemeByCurrentTheme(mode);
  }, [mode]);
  return (
    <Stack direction="row" alignItems="center" justifyContent={"space-between"}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: "1rem" }}>
        Pokédex
      </Typography>
      <Stack direction="row" marginBottom="1rem" gap={1}>
        <PerformanceToggle />
        <ThemeToggleButton mode={mode} onClick={handleChangeTheme} />
      </Stack>
    </Stack>
  );
}
