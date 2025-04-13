import { MenuItem, menuItemClasses, styled, SxProps } from "@mui/material";
import { useAppTheme } from "../../../themeSlice/hooks";
import { AppTheme } from "../../../helpers/ColorTheme";

export const StyledMenuItem = styled(MenuItem)(() => {
  const theme = useAppTheme();
  return {
    color: theme.textColor,
    background: theme.menuItemBg,
    border: theme.borderColor,
    ":hover": {
      background: theme.hoverMenuItemBg,

      border: theme.shadowColor,
    },
    [`${menuItemClasses.selected}`]: {
      background: theme.hoverMenuItemBg,
    },
  };
});

export const SelectStyle: (theme: AppTheme) => SxProps = (theme) => {
  return {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.borderColor,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.borderColor,
    },
    "& .MuiSelect-select": {
      color: theme.textColor,
    },
  };
};
