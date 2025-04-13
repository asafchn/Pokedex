import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  pagesInMemory: number;
  isFetching: boolean;
  itemsRenderedOnScreen: number;
} = {
  pagesInMemory: 0,
  itemsRenderedOnScreen: 0,
  isFetching: false,
};
const performanceSlice = createSlice({
  name: "performance",
  initialState,
  reducers: {
    setPagesInMemory: (state, action: PayloadAction<number>) => {
      state.pagesInMemory = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setItemsRenderedOnScreen: (state, action: PayloadAction<number>) => {
      state.itemsRenderedOnScreen = action.payload;
    },
  },
});

export const { setIsFetching, setPagesInMemory, setItemsRenderedOnScreen } =
  performanceSlice.actions;
export default performanceSlice.reducer;
