import { State } from "../state/store";

export const selectPagesInMemory = (state: State) =>
  state.performanceslice.pagesInMemory;

export const selectIsFetching = (state: State) =>
  state.performanceslice.isFetching;

export const selectItemsRenderedOnScreen = (state: State) =>
  state.performanceslice.itemsRenderedOnScreen;
