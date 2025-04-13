import FilterBar from "../../common/FilterBar/FilterBar";
import { pokemonTypeList } from "../../../const";
import {
  useSelectPokemonFilter,
  useSetPokemonFilter,
} from "../../../pokemonSlice/hooks";
import { useDispatch, useSelector } from "react-redux";
import { acknowledgeReset } from "../../../pokemonSlice/slice";
import { selectShouldReset } from "../../../pokemonSlice/selectors";

export function PokemonFilter() {
  const setFilters = useSetPokemonFilter();
  const filters = useSelectPokemonFilter();
  const shouldReset = useSelector(selectShouldReset);
  const dispatch = useDispatch();
  function onReset() {
    dispatch(acknowledgeReset());
  }
  return (
    <FilterBar
      shouldReset={shouldReset}
      onChange={setFilters}
      types={pokemonTypeList}
      defaultValues={filters}
      onReset={onReset}
      sortOptions={[
        { label: "Ascending", value: "asc" },
        { label: "Descending", value: "desc" },
      ]}
    />
  );
}
