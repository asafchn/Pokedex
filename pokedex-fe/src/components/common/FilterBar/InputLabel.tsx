import { InputLabel, SxProps } from "@mui/material";
import { ReactNode } from "react";

import { useAppTheme } from "../../../themeSlice/hooks";
import { AppTheme } from "../../../helpers/ColorTheme";

export function CustomInputLabel({ children }: { children: ReactNode }) {
  const theme = useAppTheme();
  return <InputLabel sx={style(theme)}>{children}</InputLabel>;
}

const style: (theme: AppTheme) => SxProps = (theme) => {
  return {
    color: theme.textColor,
    "&.Mui-focused": {
      color: theme.labelFocus,
    },
  };
};
