import { renderHook } from "@testing-library/react";
import { useHandleLocalStorageState } from "../virtualizerFetchHooks/useHandleStoreStateInLocalStorage";
import { storeDataOnLocalStorage } from "../../../../../helpers/utils";
import { Virtualizer } from "@tanstack/react-virtual";

jest.mock("../../../../../helpers/utils", () => ({
  storeDataOnLocalStorage: jest.fn(),
}));

const createMockVirtualizer = (indices: number[]) =>
  ({
    getVirtualItems: () => indices.map((index) => ({ index })),
  } as unknown as Virtualizer<HTMLDivElement, Element>);

describe("useHandleLocalStorageState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("stores scroll index and page with standard visible items", () => {
    const mockVirtualizer = createMockVirtualizer([2, 3, 4, 5]);

    renderHook(() =>
      useHandleLocalStorageState({
        rowVirtualizer: mockVirtualizer,
        pageSize: 2,
        itemVisualizedOnScreen: 2,
        filters: { sort: "asc" },
        localStorageKey: "pokedex-scroll",
      })
    );

    expect(storeDataOnLocalStorage).toHaveBeenCalledWith("pokedex-scroll", {
      page: 2,
      filters: { sort: "asc" },
      indexToScrollTo: 4,
    });
  });

  it("falls back to first index if itemVisualizedOnScreen is out of bounds", () => {
    const mockVirtualizer = createMockVirtualizer([100, 101, 102, 103]);

    renderHook(() =>
      useHandleLocalStorageState({
        rowVirtualizer: mockVirtualizer,
        pageSize: 20,
        itemVisualizedOnScreen: 4,
        filters: { generation: 1 },
        localStorageKey: "high-index",
      })
    );

    expect(storeDataOnLocalStorage).toHaveBeenCalledWith("high-index", {
      page: 5,
      filters: { generation: 1 },
      indexToScrollTo: 100,
    });
  });

  it("handles non-contiguous indices gracefully", () => {
    const mockVirtualizer = createMockVirtualizer([10, 15, 20]);

    renderHook(() =>
      useHandleLocalStorageState({
        rowVirtualizer: mockVirtualizer,
        pageSize: 5,
        itemVisualizedOnScreen: 1,
        filters: { legendary: true },
        localStorageKey: "gapped",
      })
    );

    expect(storeDataOnLocalStorage).toHaveBeenCalledWith("gapped", {
      page: 3,
      filters: { legendary: true },
      indexToScrollTo: 15,
    });
  });

  it("stores only the first index if itemVisualizedOnScreen is too small", () => {
    const mockVirtualizer = createMockVirtualizer([0]);

    renderHook(() =>
      useHandleLocalStorageState({
        rowVirtualizer: mockVirtualizer,
        pageSize: 10,
        itemVisualizedOnScreen: 3, // out of bounds
        filters: { type: "electric", sort: "asc" },
        localStorageKey: "small-list",
      })
    );

    expect(storeDataOnLocalStorage).toHaveBeenCalledWith("small-list", {
      page: 0,
      filters: { type: "electric", sort: "asc" },
      indexToScrollTo: 0,
    });
  });

  it("does nothing when there are no virtual items", () => {
    const mockVirtualizer = createMockVirtualizer([]);

    renderHook(() =>
      useHandleLocalStorageState({
        rowVirtualizer: mockVirtualizer,
        pageSize: 3,
        itemVisualizedOnScreen: 2,
        filters: { sort: "desc" },
        localStorageKey: "empty-items",
      })
    );

    expect(storeDataOnLocalStorage).not.toHaveBeenCalled();
  });

  it("does nothing when no localStorageKey is provided", () => {
    const mockVirtualizer = createMockVirtualizer([0, 1, 2]);

    renderHook(() =>
      useHandleLocalStorageState({
        rowVirtualizer: mockVirtualizer,
        pageSize: 3,
        itemVisualizedOnScreen: 2,
        filters: { sort: "desc" },
        localStorageKey: undefined,
      })
    );

    expect(storeDataOnLocalStorage).not.toHaveBeenCalled();
  });
});
