import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormControl, Select, SelectProps } from "@mui/material";
import { CustomInputLabel } from "./InputLabel";
import { SelectStyle, StyledMenuItem } from "./styles";
import { useAppTheme } from "../../../themeSlice/hooks";

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: { value: string; label: string }[];
  placeholder?: string;
  sx?: SelectProps["sx"];
};

export function FormSelect<T extends FieldValues>({
  name,
  label,
  control,
  options,
  placeholder,
}: FormSelectProps<T>) {
  const theme = useAppTheme();
  return (
    <FormControl sx={{ minWidth: 150 }}>
      <CustomInputLabel>{label}</CustomInputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            label={label}
            sx={SelectStyle(theme)}
            MenuProps={{
              MenuListProps: { sx: { background: theme.menuItemBg } },
            }}
            value={field?.value}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {placeholder ? (
              <StyledMenuItem value="">{placeholder}</StyledMenuItem>
            ) : null}

            {options.map(({ value, label }) => (
              <StyledMenuItem key={value} value={value}>
                {label}
              </StyledMenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
