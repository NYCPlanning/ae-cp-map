import { fireEvent, render, screen } from "@testing-library/react";
import { HeaderBar } from "./index";
import { BrowserRouter } from "react-router";
import { act } from "react";

describe("Header Bar", () => {
  it("renders with site name text", () => {
    render(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
    );
    expect(screen.getByText("Capital Projects Portal")).toBeInTheDocument();
  });

  it("removes parameters when clicked when passed a function to clear the selections", async () => {
    const mockSearchParams = new URLSearchParams(
      "boundaryType=ccd&boundaryId=1",
    );
    const clearSelections = () => {
      mockSearchParams.delete("boundaryType");
      mockSearchParams.delete("boundaryId");
    };
    const mockUseSearchParams = vi.fn(() => [mockSearchParams, vi.fn()]);
    vi.mock("next/navigation", () => ({
      useSearchParams: mockUseSearchParams,
    }));
    render(
      <BrowserRouter>
        <HeaderBar clearSelections={clearSelections} />
      </BrowserRouter>,
    );
    await act(() =>
      fireEvent.click(screen.getByText("Capital Projects Portal")),
    );
    expect(mockSearchParams.has("boundaryType")).toBe(false);
    expect(mockSearchParams.has("boundaryId")).toBe(false);
  });

  it("maintains parameters when clicked when not passed a function to clear the selections", async () => {
    const mockSearchParams = new URLSearchParams(
      "boundaryType=ccd&boundaryId=1",
    );
    const mockUseSearchParams = vi.fn(() => [mockSearchParams, vi.fn()]);
    vi.mock("next/navigation", () => ({
      useSearchParams: mockUseSearchParams,
    }));
    render(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
    );
    await act(() =>
      fireEvent.click(screen.getByText("Capital Projects Portal")),
    );
    expect(mockSearchParams.get("boundaryType")).toBe("ccd");
    expect(mockSearchParams.get("boundaryId")).toBe("1");
  });
});
