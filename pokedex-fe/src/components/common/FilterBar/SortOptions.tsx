import { Control } from "react-hook-form";
import { FilterParams } from "../../Pokedex/types";
import { FormSelect } from "./FormSelect";

export function SortOptions({
  control,
  sortOptions,
}: {
  control: Control<FilterParams, any, FilterParams>;
  sortOptions: { value: string; label: string }[];
}) {
  return (
    <FormSelect<FilterParams>
      name="sort"
      control={control}
      label="Sort"
      options={sortOptions}
    />
  );
}
