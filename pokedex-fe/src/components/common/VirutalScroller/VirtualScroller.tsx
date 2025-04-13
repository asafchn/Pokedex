import React, { forwardRef, useRef } from "react";
import { container, virtualItem } from "./style";
import { Box } from "@mui/material";
import { Virtualizer } from "@tanstack/react-virtual";
import { useAppTheme } from "../../../themeSlice/hooks";
import { Measurments } from "./hooks/useGetMeasurements";

type VirtualScrollerProps<T> = {
  getItem: (index: number) => T | undefined;
  width: string;
  renderItem: (item: T | undefined, cardSize: number) => React.ReactNode;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  measurments: Measurments;
};

function VirtualScrollerInner<T>(
  {
    getItem,
    renderItem,
    rowVirtualizer,
    measurments,
    width,
  }: VirtualScrollerProps<T>,
  ref: React.Ref<HTMLDivElement>
) {
  const parentRef = useRef<HTMLDivElement>(null);
  const theme = useAppTheme();
  return (
    <Box
      ref={ref || parentRef}
      sx={container(measurments.height, theme, width)}
    >
      <Box
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
          gap: "8px",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          return (
            <Box key={virtualRow.index} sx={virtualItem(virtualRow.start)}>
              {renderItem(getItem(virtualRow.index), measurments.cardSize)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export const VirtualScroller = forwardRef(VirtualScrollerInner) as <T>(
  props: VirtualScrollerProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
