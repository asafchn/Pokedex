import { createSelector } from "@reduxjs/toolkit";
import { State } from "../state/store";

export const selectPokemonState = (state: State) => state.pokemonSlice;
export const selectPokemonFilters = createSelector(
  selectPokemonState,
  ({ search, sort, type }) => ({ search, sort, type })
);

export const selectShouldReset = createSelector(
  selectPokemonState,
  ({ shouldReset }) => shouldReset
);
