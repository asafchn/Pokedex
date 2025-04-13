import { Control } from "react-hook-form";
import { FilterParams } from "../../Pokedex/types";

import { FormSelect } from "./FormSelect";

export function TypeFilter({
  control,
  types,
}: {
  types: string[];
  control: Control<FilterParams, any, FilterParams>;
}) {
  return (
    <FormSelect<FilterParams>
      name="type"
      control={control}
      label="Type"
      placeholder="All Types"
      options={types.map((type) => {
        return { label: type, value: type };
      })}
    />
  );
}
