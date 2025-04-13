import { useDispatch, useSelector } from "react-redux";
import { selectThemeMode } from "./selectors";
import { LIGHT_THEME, DARK_THEME } from "../helpers/ColorTheme";
import { useCallback } from "react";
import { setThemeMode, ThemeMode } from "./slice";

export const useAppTheme = () => {
  const mode = useSelector(selectThemeMode);

  if (mode === "light") return LIGHT_THEME;
  if (mode === "dark") return DARK_THEME;

  const prefersDark =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;

  return prefersDark ? DARK_THEME : LIGHT_THEME;
};

export const useChangeTheme = () => {
  const dispatch = useDispatch();
  return useCallback(
    (theme: ThemeMode) => {
      dispatch(setThemeMode(theme));
    },
    [dispatch]
  );
};
