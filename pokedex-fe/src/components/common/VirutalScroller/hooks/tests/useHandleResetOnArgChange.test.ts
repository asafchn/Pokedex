import { renderHook } from "@testing-library/react";
import { useHandleResetOnArgChange } from "../virtualizerFetchHooks/useHandleResetOnArgChange";
import { Virtualizer } from "@tanstack/react-virtual";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const mockVirtualizer = {
  scrollToIndex: jest.fn(),
} as unknown as Virtualizer<HTMLDivElement, Element>;

describe("useHandleResetOnArgChange", () => {
  it("clears, resets and loads page 0 on resetOn change", () => {
    const clearFetchingPage = jest.fn();
    const resetPages = jest.fn();
    const loadPage = jest.fn();

    const { rerender } = renderHook(
      ({ resetOn }) =>
        useHandleResetOnArgChange({
          clearFetchingPage,
          resetPages,
          rowVirtualizer: mockVirtualizer,
          loadPage,
          resetOn,
        }),
      { initialProps: { resetOn: "a" } }
    );

    rerender({ resetOn: "b" });

    expect(clearFetchingPage).toHaveBeenCalled();
    expect(resetPages).toHaveBeenCalled();
    expect(mockVirtualizer.scrollToIndex).toHaveBeenCalledWith(0);
    expect(loadPage).toHaveBeenCalledWith(0);
  });
});
