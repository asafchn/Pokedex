import { ThemeMode } from "../themeSlice/slice";

export function getBrowserThemeType(): ThemeMode {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
}
