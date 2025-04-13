import { Virtualizer } from "@tanstack/react-virtual";
import { useEffect, useMemo, useState } from "react";

import { useDebouncedCallback } from "use-debounce";
// in order to make this hook reusable, we will receive this static data from the outside
type Props = {
  baseItemVisualizedOnScreen: number;
  calcHeight: (windowHeight: number) => number;
  cardRenderHeight: number;
  headerHeight: number;
  staticCardGap: number;
  cardTotalYPadding: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
};

export type Measurments = {
  height: number;
  cardSize: number;
  visibleItemCount: number;
};

export function useGetMeasurements({
  baseItemVisualizedOnScreen,
  cardTotalYPadding,
  rowVirtualizer,
  calcHeight,
  cardRenderHeight,
  headerHeight,
  staticCardGap,
}: Props): Measurments {
  const [heightDynamic, setHeight] = useState(calcHeight(window.innerHeight));

  const visibleItemCount = useMemo(() => {
    return Math.min(
      Math.min(
        parseFloat(
          (
            (heightDynamic + staticCardGap) /
            (cardRenderHeight + staticCardGap)
          ).toFixed(1)
        ),
        baseItemVisualizedOnScreen
      )
    );
  }, [heightDynamic]);
  const estimateCardSize = useMemo(
    () => heightDynamic / visibleItemCount - cardTotalYPadding,
    [heightDynamic]
  );

  const debouncedSetHeight = useDebouncedCallback(
    () => setHeight(calcHeight(window.innerHeight)),
    500
  );

  useEffect(() => {
    window.addEventListener("resize", debouncedSetHeight);
    return () =>
      window.removeEventListener("resize", () => {
        setHeight(window.innerHeight - headerHeight);
      });
  }, []);
  // when height changes, triggers the list to re-evaluate
  useEffect(() => {
    if (rowVirtualizer) {
      rowVirtualizer.measure();
    }
  }, [heightDynamic]);

  return {
    height: heightDynamic,
    cardSize: estimateCardSize,
    visibleItemCount,
  };
}
