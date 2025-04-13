import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { resetFilters, setFilter } from "./slice";
import { FilterParams } from "../components/Pokedex/types";
import { selectPokemonFilters } from "./selectors";

export function useSelectPokemonFilter(): FilterParams {
  return useSelector(selectPokemonFilters);
}

export function useResetPokemonFilter() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);
}

export function useSetPokemonFilter() {
  const dispatch = useDispatch();
  return useCallback(
    (filters: FilterParams) => {
      dispatch(setFilter(filters));
    },
    [dispatch]
  );
}
