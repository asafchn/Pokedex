import { useEffect } from "react";
import { Box, SxProps } from "@mui/material";
import { useForm } from "react-hook-form";
import { FilterParams } from "../../Pokedex/types";
import { TypeFilter } from "./TypeFilter";
import { SortOptions } from "./SortOptions";
import { Search } from "./Search";
import { useDebouncedCallback } from "use-debounce";
import { AppTheme } from "../../../helpers/ColorTheme";
import { useAppTheme } from "../../../themeSlice/hooks";

type Props = {
  types: string[];
  sortOptions: { value: string; label: string }[];
  onChange: (data: FilterParams) => void;
  defaultValues?: Partial<FilterParams>;
  shouldReset: boolean;
  onReset: () => void;
};

export default function FilterBar({
  types,
  onChange,
  defaultValues,
  shouldReset,
  sortOptions,
  onReset,
}: Props) {
  const theme = useAppTheme();
  const { control, watch, reset } = useForm<FilterParams>({
    defaultValues: {
      type: "",
      sort: "asc",
      search: "",
      ...defaultValues,
    },
    mode: "onChange",
  });
  useEffect(() => {
    if (shouldReset) {
      reset();
      onReset();
    }
  }, [shouldReset]);

  const debouncedOnChange = useDebouncedCallback((value: FilterParams) => {
    onChange(value);
  }, 500);

  useEffect(() => {
    const subscription = watch((value) => {
      debouncedOnChange(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <Box sx={container(theme)}>
      <TypeFilter types={types} control={control} />
      <SortOptions sortOptions={sortOptions} control={control} />
      <Search control={control} />
    </Box>
  );
}

const container: (theme: AppTheme) => SxProps = (theme) => {
  return {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    p: 2,
    mb: 3,
    borderRadius: 2,
    boxShadow: 1,
    backgroundColor: `${theme.filterBg}`,

    "& fieldset": {
      borderColor: `${theme.borderColor}`,
    },
    "& .MuiInputBase-input": {
      color: `${theme.textColor}`,
    },
    "& .MuiSvgIcon-root": {
      color: `${theme.textColor}`,
    },
  };
};
