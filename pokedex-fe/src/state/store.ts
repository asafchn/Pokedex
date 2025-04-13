import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonApi from "../pokemonApi/api";
import pokemonSlice from "../pokemonSlice/slice";
import themeSlice from "../themeSlice/slice";
import performanceslice from "../performanceSlice/slice";
const state = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  pokemonSlice,
  themeSlice,
  performanceslice,
});

export const store = configureStore({
  reducer: state,
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare().concat(pokemonApi.middleware),
});
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
