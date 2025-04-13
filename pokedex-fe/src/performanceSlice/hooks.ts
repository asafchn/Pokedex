import { useDispatch, useSelector } from "react-redux";
import {
  selectIsFetching,
  selectItemsRenderedOnScreen,
  selectPagesInMemory,
} from "./selectors";
import { useCallback } from "react";
import {
  setIsFetching,
  setItemsRenderedOnScreen,
  setPagesInMemory,
} from "./slice";

export const useSelectPagesInMemory = () => {
  return useSelector(selectPagesInMemory);
};
export const useSelectIsFetching = () => {
  return useSelector(selectIsFetching);
};

export const useSelectItemsRenderedOnScreen = () => {
  return useSelector(selectItemsRenderedOnScreen);
};

export const useUpdateItemsRenderedOnScreen = () => {
  const dispatch = useDispatch();
  return useCallback(
    (itemsAmount: number) => {
      dispatch(setItemsRenderedOnScreen(itemsAmount));
    },
    [dispatch]
  );
};

export const useUpdatePagesInMemory = () => {
  const dispatch = useDispatch();
  return useCallback(
    (pagesAmount: number) => {
      dispatch(setPagesInMemory(pagesAmount));
    },
    [dispatch]
  );
};

export const useUpdateIsFetching = () => {
  const dispatch = useDispatch();
  return useCallback(
    (isFetching: boolean) => {
      dispatch(setIsFetching(isFetching));
    },
    [dispatch]
  );
};
