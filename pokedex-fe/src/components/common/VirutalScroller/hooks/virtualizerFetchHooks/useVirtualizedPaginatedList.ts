import { Virtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import { cleanupOnLoadPage } from "../../../../../helpers/utils";
import { useHandleLocalStorageState } from "./useHandleStoreStateInLocalStorage";
import { useHandleLoadMissingPages } from "./useHandleLoadMissingPages";
import { useHandleResetOnArgChange } from "./useHandleResetOnArgChange";
import {
  useUpdateIsFetching,
  useUpdatePagesInMemory,
} from "../../../../../performanceSlice/hooks";

export function useVirtualizedPaginatedList<T, R>({
  fetchPage,
  pageSize = 20,
  resetOn,
  rowVirtualizer,
  itemVisualizedOnScreen,
  localStorageKey,
}: {
  fetchPage: (page: number) => Promise<T[]>;
  pageSize?: number;
  itemVisualizedOnScreen: number;
  estimateSize?: () => number;
  maxPages?: number;
  totalCount: number;
  parentRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  resetOn: R;
  localStorageKey?: string;
}) {
  const [pages, setPages] = useState<Map<number, T[]>>(new Map());
  const pagesRef = useRef(pages);
  const updateFetchingStatus = useUpdateIsFetching();
  const updatePagesInMemory = useUpdatePagesInMemory();

  useEffect(() => {
    pagesRef.current = pages;
    updatePagesInMemory(pages.size);
  }, [pages]);
  const fetchingPages = useRef<Set<number>>(new Set());

  const loadPage = async (pageIndex: number) => {
    if (
      pagesRef.current.has(pageIndex) ||
      fetchingPages.current.has(pageIndex)
    ) {
      return;
    }
    fetchingPages.current.add(pageIndex);
    updateFetchingStatus(true);
    const data = await fetchPage(pageIndex);
    updateFetchingStatus(false);

    fetchingPages.current.delete(pageIndex);

    setPages((prev) =>
      cleanupOnLoadPage({
        data,
        handlePages: prev,
        loadedPageIndex: pageIndex,
      })
    );
  };
  //Spread the core logic to smaller hooks, to avoid confusion
  useHandleLoadMissingPages({ rowVirtualizer, pages, loadPage, pageSize });

  useHandleLocalStorageState<R>({
    itemVisualizedOnScreen,
    rowVirtualizer,
    pageSize,
    filters: resetOn,
    localStorageKey,
  });

  useHandleResetOnArgChange({
    clearFetchingPage: () => {
      fetchingPages.current.clear();
    },
    resetPages: () => {
      setPages(new Map());
      pagesRef.current = new Map();
    },
    rowVirtualizer,
    loadPage,
    resetOn,
  });

  const flatItem = (virtualItemIndex: number) => {
    const pageIndex = Math.floor(virtualItemIndex / pageSize);
    const indexInPage = virtualItemIndex % pageSize;
    return pages.get(pageIndex)?.[indexInPage];
  };

  return {
    getItem: flatItem,
  };
}
