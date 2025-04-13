import { Virtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";

export function useHandleResetOnArgChange<R>({
  clearFetchingPage,
  resetPages,
  rowVirtualizer,
  loadPage,
  resetOn,
}: {
  clearFetchingPage: () => void;
  resetPages: () => void;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  loadPage: (pageIndex: number) => Promise<void>;
  resetOn: R;
}) {
  // when one of the filters change we would want to reset the list
  useEffect(() => {
    clearFetchingPage();
    resetPages();
    rowVirtualizer.scrollToIndex(0);

    loadPage(0);
  }, [resetOn]);
}
