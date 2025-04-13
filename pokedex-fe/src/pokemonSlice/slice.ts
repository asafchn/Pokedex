import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterParams } from "../components/Pokedex/types";
import { LocalStorageList, pokemonLocalStorageKey } from "../const";
type InitialState = FilterParams & { shouldReset: boolean };
export const defaultParams: InitialState = {
  search: "",
  sort: "asc",
  type: "",
  shouldReset: false,
};
const getInitialState: () => InitialState = () => {
  const localStorageFilters = localStorage.getItem(pokemonLocalStorageKey);
  if (localStorageFilters) {
    const localStorageParams = JSON.parse(
      localStorage.getItem(pokemonLocalStorageKey) ?? ""
    ) as LocalStorageList;
    return { ...localStorageParams.filters, shouldReset: false };
  }

  return defaultParams;
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: getInitialState(),
  reducers: {
    setFilter: (state, action: PayloadAction<FilterParams>) => {
      return { ...state, ...action.payload };
    },
    resetFilters: (state) => {
      return { ...state, shouldReset: true };
    },
    acknowledgeReset: (state) => {
      state.shouldReset = false;
    },
  },
});
export const { setFilter, acknowledgeReset, resetFilters } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
