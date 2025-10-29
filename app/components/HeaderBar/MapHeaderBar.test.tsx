import { fireEvent, render, screen } from "@testing-library/react";
import { MapHeaderBar } from "./index";
import { BrowserRouter } from "react-router";
import { act } from "react";

describe("Map Header Bar", () => {
  it("renders with site name text", () => {
    render(
      <BrowserRouter>
        <MapHeaderBar clearSelections={() => void 0} />
      </BrowserRouter>,
    );
    expect(screen.getByText("Capital Projects Portal")).toBeInTheDocument();
  });

  it("removes parameters when clicked", async () => {
    const mockSearchParams = new URLSearchParams(
      "districtType=ccd&districtId=1",
    );
    const clearSelections = () => {
      mockSearchParams.delete("districtType");
      mockSearchParams.delete("districtId");
    };
    const mockUseSearchParams = vi.fn(() => [mockSearchParams, vi.fn()]);
    vi.mock("next/navigation", () => ({
      useSearchParams: mockUseSearchParams,
    }));
    render(
      <BrowserRouter>
        <MapHeaderBar clearSelections={clearSelections} />
      </BrowserRouter>,
    );
    await act(() =>
      fireEvent.click(screen.getByText("Capital Projects Portal")),
    );
    expect(mockSearchParams.has("districtType")).toBe(false);
    expect(mockSearchParams.has("districtId")).toBe(false);
  });
});
