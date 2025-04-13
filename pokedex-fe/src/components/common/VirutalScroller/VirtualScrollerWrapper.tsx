import { JSX, useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Stack } from "@mui/material";
import { useGetMeasurements } from "./hooks/useGetMeasurements";
import { useVirtualizedPaginatedList } from "./hooks/virtualizerFetchHooks/useVirtualizedPaginatedList";
import { VirtualScroller } from "./VirtualScroller";

type GenericVirtualListProps<TYPE, FILTERS> = {
  localStorageKey?: string;
  pageSize: number;
  width: string;
  renderItem: (item: TYPE | undefined, cardHeight: number) => JSX.Element;
  fetchPage: (pageIndex: number) => Promise<PaginatedResponse<TYPE>>;
  getInitialData: () => {
    page: number;
    indexToScrollTo: number;
  };
  filters: FILTERS;
  resetFilters: () => void;
  NoDataComponent: React.FC<{
    containerHeight: number;
    onResetFilters: () => void;
  }>;
  calcWrapperHeight: (windowHeight: number) => number;
  headerHeight?: number;
  baseItemVisualizedOnScreen?: number;
  cardRenderHeight?: number;
  cardYPadding?: number;
  staticCardGap?: number;
};

type PaginatedResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total: number;
};

export function GenericVirtualList<TYPE, FILTERS>({
  localStorageKey,
  pageSize,
  renderItem,
  fetchPage,
  getInitialData,
  filters,
  resetFilters,
  NoDataComponent,
  width,
  calcWrapperHeight,
  headerHeight = 64,
  baseItemVisualizedOnScreen = 5,
  cardRenderHeight = 110,
  cardYPadding = 16,
  staticCardGap = 8,
}: GenericVirtualListProps<TYPE, FILTERS>) {
  const [totalCount, setTotalCount] = useState(0);
  const scrollToIndex = useRef<number | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: totalCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => height / visibleItemCount,
    overscan: 0,
  });

  const measurments = useGetMeasurements({
    baseItemVisualizedOnScreen,
    calcHeight: calcWrapperHeight,
    cardRenderHeight,
    rowVirtualizer,
    headerHeight,
    staticCardGap,
    cardTotalYPadding: cardYPadding,
  });
  const { height, visibleItemCount } = measurments;

  const { getItem } = useVirtualizedPaginatedList<TYPE, FILTERS>({
    fetchPage: async (pageIndex) => {
      const result = await fetchPage(pageIndex);
      setTotalCount(result.total);
      return result.data;
    },
    pageSize,
    itemVisualizedOnScreen: visibleItemCount,
    parentRef,
    rowVirtualizer,
    totalCount,
    resetOn: filters,
    localStorageKey,
  });

  useEffect(() => {
    const { page, indexToScrollTo } = getInitialData();
    fetchPage(page).then((response) => {
      setTotalCount(response.total);
      scrollToIndex.current = indexToScrollTo;
    });
  }, []);

  useEffect(() => {
    if (
      scrollToIndex.current !== null &&
      rowVirtualizer.getVirtualItems().length > 0
    ) {
      rowVirtualizer.scrollToIndex(scrollToIndex.current, { align: "end" });

      scrollToIndex.current = null;
    }
  }, [rowVirtualizer._didMount()]);

  if (totalCount === 0) {
    return (
      <NoDataComponent containerHeight={height} onResetFilters={resetFilters} />
    );
  }

  return (
    <Stack height="100%">
      <VirtualScroller<TYPE>
        ref={parentRef}
        width={width}
        measurments={measurments}
        rowVirtualizer={rowVirtualizer}
        getItem={getItem}
        renderItem={renderItem}
      />
    </Stack>
  );
}
