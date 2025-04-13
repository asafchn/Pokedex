import { SxProps, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { FilterParams } from "../../Pokedex/types";
import { useAppTheme } from "../../../themeSlice/hooks";
import { AppTheme } from "../../../helpers/ColorTheme";

export function Search({ control }: { control: Control<FilterParams> }) {
  const theme = useAppTheme();
  return (
    <Controller
      name="search"
      control={control}
      render={({ field }) => (
        <TextField
          fullWidth
          placeholder="Search..."
          label="Search"
          {...field}
          InputLabelProps={{ sx: { color: theme.textColor } }}
          sx={InputStyle(theme)}
        />
      )}
    />
  );
}

const InputStyle: (theme: AppTheme) => SxProps = (theme) => {
  return {
    flex: 1,
    minWidth: 250,
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.borderColor,
      },
    },
    "& label.Mui-focused": {
      color: "inherit",
    },
  };
};
