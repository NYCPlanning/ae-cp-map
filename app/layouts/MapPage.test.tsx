import { StreetscapeProvider } from "@nycplanning/streetscape";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { ReactNode } from "react";
import { createRoutesStub, Outlet, useLocation } from "react-router";
import MapPage, { loader } from "./MapPage";

// JSDOM's selector engine does not support the mapControl variant's :has() selector.
vi.mock("@nycplanning/streetscape", async (importOriginal) => {
  const streetscape =
    await importOriginal<typeof import("@nycplanning/streetscape")>();

  return {
    ...streetscape,
    Tabs: ({
      children,
      id,
      index,
    }: {
      children: ReactNode;
      id?: string;
      index?: number;
    }) => (
      <streetscape.Tabs id={id} index={index} variant="base">
        {children}
      </streetscape.Tabs>
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

const MapPageOutlet = () => {
  const { search } = useLocation();

  return (
    <>
      <output data-testid="location-search" hidden>
        {search}
      </output>
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
    </>
  );
};

const renderMapPage = (queryString: string) => {
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
      <Stub initialEntries={[`/map?${queryString}`]} />
    </StreetscapeProvider>,
  );
};

const openLayersPanel = async () => {
  await screen.findByTestId("atlas");
  const panelButton = screen.getByRole("button", {
    name: "Capital Planning Data",
    hidden: true,
  });
  await userEvent.click(panelButton);
  await waitFor(() =>
    expect(panelButton).toHaveAttribute("aria-expanded", "true"),
  );
};

describe("MapPage geographic boundary selector", () => {
  const getSearchParams = () =>
    new URLSearchParams(
      screen.getByTestId("location-search").textContent ?? "",
    );

  it("clears and restores community district params", async () => {
    renderMapPage("boundaryType=cd&communityDistrictIds=1");
    await screen.findByTestId("atlas");

    await userEvent.click(screen.getByRole("tab", { name: "Boroughs" }));
    await waitFor(() => {
      expect(getSearchParams().get("boundaryType")).toBe("borough");
      expect(getSearchParams().get("communityDistrictIds")).toBeNull();
    });

    await userEvent.click(
      screen.getByRole("tab", { name: "Community Districts" }),
    );

    await waitFor(() => {
      expect(getSearchParams().get("boundaryType")).toBe("cd");
      expect(getSearchParams().get("communityDistrictIds")).toBe("1");
    });
  });

  it("clears and restores city council params", async () => {
    renderMapPage("boundaryType=ccd&cityCouncilDistrictIds=2");
    await screen.findByTestId("atlas");

    await userEvent.click(
      screen.getByRole("tab", { name: "Community Districts" }),
    );
    await waitFor(() => {
      expect(getSearchParams().get("boundaryType")).toBe("cd");
      expect(getSearchParams().get("cityCouncilDistrictIds")).toBeNull();
    });

    await userEvent.click(screen.getByRole("tab", { name: "City Council" }));

    await waitFor(() => {
      expect(getSearchParams().get("boundaryType")).toBe("ccd");
      expect(getSearchParams().get("cityCouncilDistrictIds")).toBe("2");
    });
  });

  it("clears and restores borough params", async () => {
    renderMapPage("boundaryType=borough&boroughIds=3");
    await screen.findByTestId("atlas");

    await userEvent.click(
      screen.getByRole("tab", { name: "Community Districts" }),
    );
    await waitFor(() => {
      expect(getSearchParams().get("boundaryType")).toBe("cd");
      expect(getSearchParams().get("boroughIds")).toBeNull();
    });

    await userEvent.click(screen.getByRole("tab", { name: "Boroughs" }));

    await waitFor(() => {
      expect(getSearchParams().get("boundaryType")).toBe("borough");
      expect(getSearchParams().get("boroughIds")).toBe("3");
    });
  });
});

describe("MapPage layer controls", () => {
  it("turns a layer on with its switch", async () => {
    renderMapPage("layers=");
    await openLayersPanel();

    const capitalProjectsSwitch = screen.getByRole("checkbox", {
      name: "Capital Projects",
    });
    expect(capitalProjectsSwitch).not.toBeChecked();

    await userEvent.click(capitalProjectsSwitch);

    await waitFor(() => expect(capitalProjectsSwitch).toBeChecked());
  });

  it("renders layer switch states from the query params", async () => {
    renderMapPage(
      "layers=capitalProjects,cbbr,facilities&supportingLayers=housing",
    );
    await openLayersPanel();

    expect(screen.getByLabelText("Capital Projects")).toBeChecked();
    expect(
      screen.getByLabelText("Community Board Capital Budget Requests"),
    ).toBeChecked();
    expect(screen.getByLabelText("Facilities")).toBeChecked();
    expect(screen.getByLabelText("Housing Growth layer")).toBeChecked();
  });

  it("does not open How to Use This Tool when Housing Growth is turned on", async () => {
    renderMapPage("layers=");
    await openLayersPanel();

    await userEvent.click(screen.getByLabelText("Housing Growth layer"));

    expect(
      screen.getByRole("button", {
        name: "Housing Growth Supporting Layer options panel",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "How to Use This Tool",
      }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("expands all layer accordions except How to Use This Tool", async () => {
    renderMapPage("layers=capitalProjects,cbbr,facilities");
    await openLayersPanel();

    await userEvent.click(screen.getByText("Expand All"));

    expect(
      screen.getByRole("button", {
        name: "Capital Projects filters (0 applied)",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "Community Board Capital Budget Requests filters (0 applied)",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "Facilities filters (0 applied)",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "Community Board Budget Request Legend",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "Housing Growth Supporting Layer options panel",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "How to Use This Tool",
      }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("collapses all layer accordions without changing How to Use This Tool", async () => {
    renderMapPage("layers=capitalProjects,cbbr,facilities");
    await openLayersPanel();

    const howToButton = screen.getByRole("button", {
      name: "How to Use This Tool",
    });
    await userEvent.click(howToButton);
    await userEvent.click(screen.getByText("Collapse All"));

    expect(
      screen.getByRole("button", {
        name: "Capital Projects filters (0 applied)",
      }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", {
        name: "Community Board Capital Budget Requests filters (0 applied)",
      }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", {
        name: "Facilities filters (0 applied)",
      }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", {
        name: "Community Board Budget Request Legend",
      }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", {
        name: "Housing Growth Supporting Layer options panel",
      }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", { name: "How to Use This Tool" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("clears applied filters without turning off any layers", async () => {
    renderMapPage(
      "layers=capitalProjects,cbbr,facilities&supportingLayers=housing&commitmentsTotalMin=100&commitmentsTotalMax=500&cbbrPolicyAreaId=1&cbbrNeedGroupId=1&cbbrAgencyInitials=DOT",
    );
    await openLayersPanel();

    expect(screen.getByText("Filters (1)")).toBeInTheDocument();
    expect(screen.getByText("Filters (3)")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Capital Projects filters (1 applied)",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Community Board Capital Budget Requests filters (3 applied)",
      }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText("Expand All"));
    await userEvent.click(
      screen.getByRole("checkbox", { name: "Facility Type Public" }),
    );
    expect(screen.getByText("Filters (2)")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Facilities filters (2 applied)",
      }),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText("Clear All"));

    await waitFor(() =>
      expect(
        screen.getAllByText(/^Filters/).map((filter) => filter.textContent),
      ).toEqual(["Filters (0)", "Filters (0)", "Filters (0)"]),
    );
    expect(screen.getByLabelText("Capital Projects")).toBeChecked();
    expect(
      screen.getByLabelText("Community Board Capital Budget Requests"),
    ).toBeChecked();
    expect(screen.getByLabelText("Facilities")).toBeChecked();
    expect(screen.getByLabelText("Housing Growth layer")).toBeChecked();
  });
});
