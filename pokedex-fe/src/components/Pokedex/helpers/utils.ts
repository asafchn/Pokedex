import { useCallback } from "react";
import { useSelectPokemonFilter } from "../../../pokemonSlice/hooks";

export function useVirtualPokemonListUtils(pageSize: number) {
  const filters = useSelectPokemonFilter();

  const payload = useCallback(
    (pageIndex: number) => {
      return {
        page: pageIndex,
        pageSize,
        type: filters.type,
        sort: filters.sort,
        search: filters.search,
      };
    },
    [pageSize, filters]
  );
  return { payload };
}
