import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub, Outlet } from "react-router";
import { useStore } from "~/store";
import { ExportDataModal } from "./ExportDataModal";

const initialStoreState = useStore.getInitialState();
const clearCapitalProjectFilters = vi.fn();
const Parent = () => <Outlet />;

const Stub = createRoutesStub([
  {
    path: "/",
    Component: Parent,
    children: [
      {
        id: "layouts/ResultsPanel",
        path: "capital-projects",
        loader: () => ({
          budgetRequestsResponse: { totalBudgetRequests: 20 },
          capitalProjectsResponse: { totalProjects: 1234 },
          facilitiesResponse: { totalFacilities: 40 },
          boroughsResponse: { boroughs: [] },
        }),
        Component: ExportDataModal,
        HydrateFallback: () => null,
      },
    ],
  },
]);

const openModal = async (initialEntry: string) => {
  render(<Stub initialEntries={[initialEntry]} />);
  const exportButton = await screen.findByRole("button", {
    name: "Export Data",
  });
  fireEvent.click(exportButton);
  await screen.findByRole("heading", { level: 2 });
};

describe("ExportDataModal", () => {
  beforeEach(() => {
    useStore.setState(initialStoreState, true);
    clearCapitalProjectFilters.mockClear();
    useStore.setState({ clearCapitalProjectFilters });
  });

  it("renders the selected location and dataset options", async () => {
    await openModal("/capital-projects");

    expect(await screen.findByText("New York City (all)")).toBeInTheDocument();
    expect(screen.getByText("Datasets")).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Capital Projects" }),
    ).toBeInTheDocument();
  });

  it("shows a clear button for selected filters and calls its handler", async () => {
    await openModal("/capital-projects?managingAgency=DOT");
    const clearButton = await screen.findByRole("button", {
      name: "Clear Capital Projects filters",
    });

    await userEvent.click(clearButton);

    expect(clearCapitalProjectFilters).toHaveBeenCalledOnce();
  });

  it("shows the record count in the modal heading", async () => {
    await openModal("/capital-projects");

    expect(
      await screen.findByRole("heading", {
        name: "Export 1,234 records",
        level: 2,
      }),
    ).toBeInTheDocument();
  });
});
