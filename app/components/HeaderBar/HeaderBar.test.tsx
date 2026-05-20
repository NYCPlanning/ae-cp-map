import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { HeaderBar } from "./index";
import { createMemoryRouter, RouterProvider } from "react-router";
import { act } from "react";
import {
  createListCollection,
  StreetscapeProvider,
  useCombobox,
} from "@nycplanning/streetscape";
import type {
  ComboboxCollectionItemProps,
  ListCollection,
  UseComboboxReturn,
} from "@nycplanning/streetscape";

function renderWithRouter(ui: React.ReactElement, initialEntry = "/") {
  const router = createMemoryRouter(
    [
      {
        id: "layouts/MapPage",
        path: "/",
        element: ui,
      },
    ],
    {
      initialEntries: [initialEntry],
    },
  );

  return render(
    <StreetscapeProvider>
      <RouterProvider router={router} />
    </StreetscapeProvider>,
  );
}

const items: ComboboxCollectionItemProps[] = [];

const collection = createListCollection({
  items,
});

const defaultRadiusProps = {
  clearRadiusFilter: vi.fn(),
  setAddressSearchSliderValue: vi.fn(),
  addressSearchSliderValue: 400,
  addressSearchError: null,
  sliderValue: 400,
};

describe("Header Bar", () => {
  it("renders with site name text", () => {
    const { result } = renderHook(() =>
      useCombobox<UseComboboxReturn>({
        collection: collection as ListCollection,
      }),
    );
    renderWithRouter(
      <HeaderBar
        {...defaultRadiusProps}
        addressSearchQuery={null}
        addressSearchResults={collection}
        addressSearchError={null}
        isLoading={false}
        combobox={result.current}
      />,
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

    const { result } = renderHook(() =>
      useCombobox<UseComboboxReturn>({
        collection: collection as ListCollection,
      }),
    );
    renderWithRouter(
      <HeaderBar
        {...defaultRadiusProps}
        clearSelections={clearSelections}
        addressSearchQuery={null}
        addressSearchResults={collection}
        addressSearchError={null}
        isLoading={false}
        combobox={result.current}
      />,
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

    const { result } = renderHook(() =>
      useCombobox<UseComboboxReturn>({
        collection: collection as ListCollection,
      }),
    );
    renderWithRouter(
      <HeaderBar
        {...defaultRadiusProps}
        addressSearchQuery={null}
        addressSearchResults={collection}
        addressSearchError={null}
        isLoading={false}
        combobox={result.current}
      />,
    );
    await act(() =>
      fireEvent.click(screen.getByText("Capital Projects Portal")),
    );
    expect(mockSearchParams.get("boundaryType")).toBe("ccd");
    expect(mockSearchParams.get("boundaryId")).toBe("1");
  });
});
