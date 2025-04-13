import { Virtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
import { useUpdateItemsRenderedOnScreen } from "../../../../../performanceSlice/hooks";
import { useDebouncedCallback } from "use-debounce";

// core logic of the scroll, will always load the missing pages so the scroll will be smooth
export function useHandleLoadMissingPages<T>({
  rowVirtualizer,
  pages,
  pageSize,
  loadPage,
}: {
  pages: Map<number, T[]>;
  pageSize: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  loadPage: (pageIndex: number) => Promise<void>;
}) {
  const updateItemsRendered = useUpdateItemsRenderedOnScreen();
  const debounceUpdateItemRendered = useDebouncedCallback(
    updateItemsRendered,
    500
  );
  function handleLoadMissingPages() {
    const missingPages = new Set<number>();
    rowVirtualizer.getVirtualItems().forEach((virtualItem) => {
      const pageIndex = Math.floor(virtualItem.index / pageSize);
      if (!pages.has(pageIndex)) {
        missingPages.add(pageIndex);
      }
    });
    debounceUpdateItemRendered(rowVirtualizer.getVirtualItems().length);
    missingPages.forEach((page) => loadPage(page));
  }
  useEffect(handleLoadMissingPages, [rowVirtualizer.getVirtualItems()]);
}
