import { fireEvent, render, screen } from "@testing-library/react";
import { NonMapHeaderBar } from "./index";
import { BrowserRouter } from "react-router";
import { act } from "react";

describe("Non-Map Header Bar", () => {
  it("renders with site name text", () => {
    render(
      <BrowserRouter>
        <NonMapHeaderBar />
      </BrowserRouter>,
    );
    expect(screen.getByText("Capital Projects Portal")).toBeInTheDocument();
  });

  it("maintains parameters when clicked", async () => {
    const mockSearchParams = new URLSearchParams(
      "districtType=ccd&districtId=1",
    );
    const mockUseSearchParams = vi.fn(() => [mockSearchParams, vi.fn()]);
    vi.mock("next/navigation", () => ({
      useSearchParams: mockUseSearchParams,
    }));
    render(
      <BrowserRouter>
        <NonMapHeaderBar />
      </BrowserRouter>,
    );
    await act(() =>
      fireEvent.click(screen.getByText("Capital Projects Portal")),
    );
    expect(mockSearchParams.get("districtType")).toBe("ccd");
    expect(mockSearchParams.get("districtId")).toBe("1");
  });
});
