import { StreetscapeProvider } from "@nycplanning/streetscape";
import { render, screen, waitFor } from "@testing-library/react";
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
  <>
    <input aria-label="Test text field" />
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
  await userEvent.click(
    screen.getByRole("button", {
      name: "Toggle layers panel",
      hidden: true,
    }),
  );
};

describe("MapPage layer filter visibility", () => {
  it("shows each layer's filters when the layers are on", async () => {
    renderMapPage("layers=");
    await openLayersPanel();

    expect(
      screen.queryByRole("button", { name: /^Capital Projects filters/ }),
    ).not.toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("Capital Projects"));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /^Capital Projects filters/ }),
      ).toBeVisible();
    });
  });

  it("only shows filters for layers that are toggled on", async () => {
    renderMapPage("layers=");
    await openLayersPanel();

    await userEvent.click(screen.getByText("Expand All"));

    expect(screen.getByText("Managing Agency")).not.toBeVisible();
    expect(screen.getByText("Policy Area")).not.toBeVisible();
    expect(screen.getByText("Facility Jurisdiction")).not.toBeVisible();
    expect(
      screen.getByText("Health Care and Human Services"),
    ).not.toBeVisible();

    await userEvent.click(screen.getByLabelText("Capital Projects"));
    await waitFor(() => {
      expect(screen.getByText("Managing Agency")).toBeVisible();
      expect(screen.getByText("Policy Area")).not.toBeVisible();
      expect(screen.getByText("Facility Jurisdiction")).not.toBeVisible();
      expect(
        screen.getByText("Health Care and Human Services"),
      ).not.toBeVisible();
    });

    await userEvent.click(
      screen.getByLabelText("Community Board Capital Budget Requests"),
    );
    await waitFor(() => {
      expect(screen.getByText("Managing Agency")).toBeVisible();
      expect(screen.getByText("Policy Area")).toBeVisible();
      expect(screen.getByText("Facility Jurisdiction")).not.toBeVisible();
      expect(screen.getByText("Health Care and Human Services")).toBeVisible();
    });

    await userEvent.click(screen.getByLabelText("Facilities"));
    await waitFor(() => {
      expect(screen.getByText("Managing Agency")).toBeVisible();
      expect(screen.getByText("Policy Area")).toBeVisible();
      expect(screen.getByText("Facility Jurisdiction")).toBeVisible();
      expect(screen.getByText("Health Care and Human Services")).toBeVisible();
    });
  });

  it("does not open How to Use This Tool when Housing Growth is turned on", async () => {
    renderMapPage("layers=");
    await openLayersPanel();

    await userEvent.click(screen.getByLabelText("Toggle Housing Growth layer"));

    expect(
      screen.getByRole("button", {
        name: "Close Housing Growth Supporting Layer options panel",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "Open how to use this tool panel",
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
      screen.getByRole("button", { name: "Facilities filters (0 applied)" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: "Toggle legend panel" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "Close Housing Growth Supporting Layer options panel",
      }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", {
        name: "Open how to use this tool panel",
      }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("collapses all layer accordions without changing How to Use This Tool", async () => {
    renderMapPage("layers=capitalProjects,cbbr,facilities");
    await openLayersPanel();

    const howToButton = screen.getByRole("button", {
      name: "Open how to use this tool panel",
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
      screen.getByRole("button", { name: "Facilities filters (0 applied)" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", { name: "Toggle legend panel" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", {
        name: "Open Housing Growth Supporting Layer options panel",
      }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", { name: "Close how to use this tool panel" }),
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
      screen.getByRole("button", { name: "Facilities filters (2 applied)" }),
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
    expect(screen.getByLabelText("Toggle Housing Growth layer")).toBeChecked();
  });
});

describe("MapPage controls visibility", () => {
  it("hides and restores all map controls with the H shortcut and restore button", async () => {
    const { container } = renderMapPage("");
    await screen.findByTestId("atlas");

    await userEvent.keyboard("h");

    const restoreButton = screen.getByRole("button", {
      name: "Show controls (H)",
    });
    [
      ".tabsContainer",
      ".filtersContainer",
      ".mapControlsContainer",
      ".mapLayout > .resultsContainer",
    ].forEach((selector) => {
      expect(container.querySelector(selector)).toHaveStyle({
        display: "none",
      });
    });

    await userEvent.click(restoreButton);

    expect(
      screen.queryByRole("button", { name: "Show controls (H)" }),
    ).not.toBeInTheDocument();
    [
      ".tabsContainer",
      ".filtersContainer",
      ".mapControlsContainer",
      ".mapLayout > .resultsContainer",
    ].forEach((selector) => {
      expect(container.querySelector(selector)).not.toHaveStyle({
        display: "none",
      });
    });
  });

  it("does not toggle controls while typing in a text field", async () => {
    renderMapPage("");
    await screen.findByTestId("atlas");

    await userEvent.click(
      screen.getByRole("textbox", { name: "Test text field" }),
    );
    await userEvent.keyboard("h");

    expect(
      screen.queryByRole("button", { name: "Show controls (H)" }),
    ).not.toBeInTheDocument();
  });
});
