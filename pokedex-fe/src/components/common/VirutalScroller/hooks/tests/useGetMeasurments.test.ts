import { renderHook, act } from "@testing-library/react";
import { useGetMeasurements } from "../useGetMeasurements";
import { Virtualizer } from "@tanstack/react-virtual";

jest.useFakeTimers();

const mockMeasure = jest.fn();
const mockVirtualizer = {
  measure: mockMeasure,
} as unknown as Virtualizer<HTMLDivElement, Element>;

describe("useGetMeasurements", () => {
  const baseItemVisualizedOnScreen = 5;
  const cardRenderHeight = 110;
  const staticCardGap = 8;
  const cardTotalYPadding = 16;
  const headerHeight = 80;

  const calcHeight = (innerHeight: number) => innerHeight - headerHeight;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 800,
    });
  });

  it("calculates initial height, card size, and visibleItemCount correctly", () => {
    const { result } = renderHook(() =>
      useGetMeasurements({
        baseItemVisualizedOnScreen,
        cardRenderHeight,
        cardTotalYPadding,
        calcHeight,
        headerHeight,
        staticCardGap,
        rowVirtualizer: mockVirtualizer,
      })
    );

    const expectedHeight = 720;
    const expectedVisibleCount = Math.min(
      Math.floor(
        (expectedHeight + staticCardGap) / (cardRenderHeight + staticCardGap)
      ),
      baseItemVisualizedOnScreen
    );

    const expectedCardSize =
      expectedHeight / expectedVisibleCount - cardTotalYPadding;

    expect(result.current.height).toBe(expectedHeight);
    expect(result.current.visibleItemCount).toBe(expectedVisibleCount);
    expect(result.current.cardSize).toBeCloseTo(expectedCardSize, 1);
    expect(mockMeasure).toHaveBeenCalledTimes(1);
  });

  it("updates measurements on window resize", () => {
    const { result } = renderHook(() =>
      useGetMeasurements({
        baseItemVisualizedOnScreen,
        cardRenderHeight,
        cardTotalYPadding,
        calcHeight,
        headerHeight,
        staticCardGap,
        rowVirtualizer: mockVirtualizer,
      })
    );

    expect(result.current.height).toBe(720);

    // Change window.innerHeight
    act(() => {
      window.innerHeight = 1000;
      window.dispatchEvent(new Event("resize"));
      jest.advanceTimersByTime(500);
    });

    expect(result.current.height).toBe(920);
    expect(mockMeasure).toHaveBeenCalledTimes(2); // called again after resize
  });

  it("caps visibleItemCount at baseItemVisualizedOnScreen", () => {
    Object.defineProperty(window, "innerHeight", {
      value: 3000,
    });

    const { result } = renderHook(() =>
      useGetMeasurements({
        baseItemVisualizedOnScreen: 3,
        cardRenderHeight,
        cardTotalYPadding,
        calcHeight,
        headerHeight,
        staticCardGap,
        rowVirtualizer: mockVirtualizer,
      })
    );

    expect(result.current.visibleItemCount).toBe(3); // capped at base limit
  });

  it("cleans up resize event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() =>
      useGetMeasurements({
        baseItemVisualizedOnScreen,
        cardRenderHeight,
        cardTotalYPadding,
        calcHeight,
        headerHeight,
        staticCardGap,
        rowVirtualizer: mockVirtualizer,
      })
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });
});
