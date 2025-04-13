import { State } from "../state/store";
import { SxProps, Theme } from "@mui/system";

export const selectThemeMode = (state: State) => state.themeSlice.mode;

type StyleBuilder<TTheme> = (theme: TTheme) => SxProps<Theme>;

export function sxFromTheme<TTheme>(theme: TTheme) {
  return (styleBuilder: StyleBuilder<TTheme>): SxProps<Theme> => {
    return styleBuilder(theme);
  };
}
