import { renderHook } from "@testing-library/react";
import { useHandleLoadMissingPages } from "../virtualizerFetchHooks/useHandleLoadMissingPages";
import { Virtualizer } from "@tanstack/react-virtual";
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const createMockVirtualizer = (indices: number[]) =>
  ({
    getVirtualItems: () => indices.map((index) => ({ index })),
  } as unknown as Virtualizer<HTMLDivElement, Element>);

describe("useHandleLoadMissingPages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls loadPage for all missing pages in view", () => {
    const loadPage = jest.fn();
    const pages = new Map();

    const mockVirtualizer = createMockVirtualizer([0, 1, 2, 3, 4, 5]);

    renderHook(() =>
      useHandleLoadMissingPages({
        rowVirtualizer: mockVirtualizer,
        pages,
        pageSize: 2,
        loadPage,
      })
    );

    expect(loadPage).toHaveBeenCalledTimes(3);
    expect(loadPage).toHaveBeenNthCalledWith(1, 0);
    expect(loadPage).toHaveBeenNthCalledWith(2, 1);
    expect(loadPage).toHaveBeenNthCalledWith(3, 2);
  });

  it("calls loadPage only for the single missing page", () => {
    const loadPage = jest.fn();
    const pages = new Map<number, string[]>([
      [0, ["Bulbasaur", "Ivysaur"]],
      [2, ["Charmander", "Charmeleon"]],
    ]);

    const mockVirtualizer = createMockVirtualizer([0, 1, 2, 3, 4]);

    renderHook(() =>
      useHandleLoadMissingPages({
        rowVirtualizer: mockVirtualizer,
        pages,
        pageSize: 2,
        loadPage,
      })
    );

    expect(loadPage).toHaveBeenCalledTimes(1);
    expect(loadPage).toHaveBeenCalledWith(1);
  });

  it("does not call loadPage when all visible pages are loaded", () => {
    const loadPage = jest.fn();
    const pages = new Map<number, string[]>([
      [0, ["Bulbasaur", "Ivysaur"]],
      [1, ["Venusaur", "Caterpie"]],
      [2, ["Charmander", "Charmeleon"]],
    ]);

    const mockVirtualizer = createMockVirtualizer([0, 1, 2, 3, 4]);

    renderHook(() =>
      useHandleLoadMissingPages({
        rowVirtualizer: mockVirtualizer,
        pages,
        pageSize: 2,
        loadPage,
      })
    );

    expect(loadPage).not.toHaveBeenCalled();
  });
});
