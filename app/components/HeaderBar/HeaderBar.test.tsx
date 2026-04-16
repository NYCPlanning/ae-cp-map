import { fireEvent, render, screen } from "@testing-library/react";
import { HeaderBar } from "./index";
import { BrowserRouter } from "react-router";
import { act } from "react";
import { createListCollection, useCombobox } from "@nycplanning/streetscape";
import type {
  ComboboxCollectionItemProps,
  ListCollection,
  UseComboboxReturn,
} from "@nycplanning/streetscape";

const items: ComboboxCollectionItemProps[] = [];

const collection = createListCollection({
  items,
});

const defaultRadiusProps = {
  clearRadiusFilter: vi.fn(),
  setAddressSearchSliderValue: vi.fn(),
  addressSearchSliderValue: 400,
  sliderValue: 400,
};

describe("Header Bar", () => {
  it("renders with site name text", () => {
    const combobox = useCombobox<UseComboboxReturn>({
      collection: collection as ListCollection,
    });
    render(
      <BrowserRouter>
        <HeaderBar
          {...defaultRadiusProps}
          addressSearchQuery={null}
          addressSearchResults={collection}
          isLoading={false}
          combobox={combobox}
        />
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

    const combobox = useCombobox<UseComboboxReturn>({
      collection: collection as ListCollection,
    });
    render(
      <BrowserRouter>
        <HeaderBar
          {...defaultRadiusProps}
          clearSelections={clearSelections}
          addressSearchQuery={null}
          addressSearchResults={collection}
          isLoading={false}
          combobox={combobox}
        />
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

    const combobox = useCombobox<UseComboboxReturn>({
      collection: collection as ListCollection,
    });
    render(
      <BrowserRouter>
        <HeaderBar
          {...defaultRadiusProps}
          addressSearchQuery={null}
          addressSearchResults={collection}
          isLoading={false}
          combobox={combobox}
        />
      </BrowserRouter>,
    );
    await act(() =>
      fireEvent.click(screen.getByText("Capital Projects Portal")),
    );
    expect(mockSearchParams.get("boundaryType")).toBe("ccd");
    expect(mockSearchParams.get("boundaryId")).toBe("1");
  });
});
