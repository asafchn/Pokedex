import { Virtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
import { storeDataOnLocalStorage } from "../../../../../helpers/utils";
export function useHandleLocalStorageState<F>({
  rowVirtualizer,
  pageSize,
  localStorageKey,
  itemVisualizedOnScreen,
  filters,
}: {
  pageSize: number;
  itemVisualizedOnScreen: number;
  localStorageKey?: string;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  filters: F;
}) {
  // When stopping on a page we store the current page with the filters to the local storage
  useEffect(() => {
    if (!localStorageKey) {
      return;
    }
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (!virtualItems.length) {
      return;
    }
    const rowIndex =
      virtualItems[Math.ceil(itemVisualizedOnScreen)]?.index ??
      virtualItems[0].index;
    // we want to always take the last visual item that we see on screen
    const lastVisibleIndex = rowIndex;
    const pageIndex = Math.floor(lastVisibleIndex / pageSize);

    storeDataOnLocalStorage<F>(localStorageKey, {
      page: pageIndex,
      filters: filters,
      indexToScrollTo: lastVisibleIndex,
    } as F);
  }, [rowVirtualizer.getVirtualItems(), filters]);
}
