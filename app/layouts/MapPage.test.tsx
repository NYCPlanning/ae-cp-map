import { StreetscapeProvider } from "@nycplanning/streetscape";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRoutesStub, Outlet } from "react-router";
import MapPage, { loader } from "./MapPage";

vi.mock("@nycplanning/streetscape", async (importOriginal) => {
  const streetscape =
    await importOriginal<typeof import("@nycplanning/streetscape")>();

  return {
    ...streetscape,
    Tab: ({ children }: { children: React.ReactNode }) => (
      <button type="button">{children}</button>
    ),
  };
});

vi.mock("../components/atlas.client", () => ({
  Atlas: () => <div data-testid="atlas" />,
  MAX_ZOOM: 20,
  MIN_ZOOM: 10,
}));

const loaderData: Awaited<ReturnType<typeof loader>> = {
  boroughs: [],
  communityDistricts: null,
  cityCouncilDistricts: null,
  managingAgencies: [],
  agencyBudgets: [],
  cbbrPolicyAreas: [],
  cbbrNeedGroups: [],
  cbbrAgencies: [],
  cbbrAgencyCategoryResponses: [],
  cbbrAgencyCategoryResponseIds: [],
  facilityTypes: [],
  facilityOversightAgency: null,
  facilityAgencies: [],
  facilityJurisdictions: [],
  facilityCategoriesList: [],
  facilityCategoryIds: [],
  facilityGroupIds: [],
  facilitySubgroupIds: [],
};

const MapPageOutlet = () => (
  <Outlet
    context={{
      viewState: {
        longitude: -74,
        latitude: 40.7,
        zoom: 10,
        bearing: 0,
        pitch: 0,
      },
      setViewState: vi.fn(),
      clearCombobox: vi.fn(),
      addressSearchSliderValue: undefined,
      clearRadiusFilter: vi.fn(),
    }}
  />
);

const renderMapPage = (layers: string) => {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: MapPageOutlet,
      children: [
        {
          path: "map",
          Component: MapPage,
          loader: () => loaderData,
          HydrateFallback: () => <></>,
        },
      ],
    },
  ]);

  return render(
    <StreetscapeProvider>
      <Stub initialEntries={[`/map?layers=${layers}`]} />
    </StreetscapeProvider>,
  );
};

const openLayersPanel = async () => {
  await screen.findByTestId("atlas");
  await userEvent.click(
    screen.getByRole("button", {
      name: "Toggle layers panel",
      hidden: true,
    }),
  );
};

describe("MapPage layer filter visibility", () => {
  it("shows each layer's filters and the CBBR legend when the layers are on", async () => {
    renderMapPage("capitalProjects,cbbr,facilities");
    await openLayersPanel();

    const filters = screen.getAllByText("Filters (0)");
    expect(filters).toHaveLength(3);
    filters.forEach((filter) =>
      expect(filter.closest(".chakra-accordion__item")).not.toHaveAttribute(
        "hidden",
      ),
    );
    expect(
      screen.getByText("Show Legend").closest(".chakra-accordion__item"),
    ).not.toHaveAttribute("hidden");
  });

  it("hides each layer's filters and the CBBR legend when the layers are off", async () => {
    renderMapPage("");
    await openLayersPanel();

    const filters = screen.getAllByText("Filters (0)");
    expect(filters).toHaveLength(3);
    filters.forEach((filter) =>
      expect(filter.closest(".chakra-accordion__item")).toHaveAttribute(
        "hidden",
      ),
    );
    expect(
      screen.getByText("Show Legend").closest(".chakra-accordion__item"),
    ).toHaveAttribute("hidden");
  });
});
