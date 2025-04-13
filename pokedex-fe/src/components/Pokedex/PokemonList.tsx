import { useLazyGetPokemonsQuery } from "../../pokemonApi/api";
import { Pokemon } from "./types";
import { FilterParams } from "./types";
import {
  useResetPokemonFilter,
  useSelectPokemonFilter,
} from "../../pokemonSlice/hooks";
import { pokemonLocalStorageKey } from "../../const";
import { getPokemonInitData } from "../../helpers/utils";
import { useVirtualPokemonListUtils } from "./helpers/utils";
import NoPokemonFound from "./NoPokemonFound";
import { calcHeight, pageSize, cardRenderHeight } from "./consts";

import { GenericVirtualList } from "../common/VirutalScroller/VirtualScrollerWrapper";
import { PokemonCardWrapper } from "./PokemonCard/PokemonCardWrapper";

export default function PokemonList() {
  const resetFilters = useResetPokemonFilter();
  const filters = useSelectPokemonFilter();
  const { payload } = useVirtualPokemonListUtils(pageSize);
  const [trigger] = useLazyGetPokemonsQuery();
  const getInitialData = () => {
    const initialData = getPokemonInitData();
    if (!initialData) {
      return { indexToScrollTo: 0, page: 0 };
    }
    return {
      indexToScrollTo: initialData.indexToScrollTo,
      page: initialData.page,
    };
  };
  async function fetchPage(pageIndex: number) {
    return await trigger(payload(pageIndex)).unwrap();
  }

  return (
    <GenericVirtualList<Pokemon, FilterParams>
      fetchPage={fetchPage}
      NoDataComponent={NoPokemonFound}
      getInitialData={getInitialData}
      localStorageKey={pokemonLocalStorageKey}
      filters={filters}
      resetFilters={resetFilters}
      pageSize={15}
      cardRenderHeight={cardRenderHeight}
      calcWrapperHeight={calcHeight}
      renderItem={(pokemon, cardSize) => (
        <PokemonCardWrapper cardSize={cardSize} pokemon={pokemon} />
      )}
    />
  );
}
