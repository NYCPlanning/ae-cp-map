import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResultsPanelMain from "./ResultsPanel";
import { createRoutesStub, Outlet, useSearchParams } from "react-router";
import { useState } from "react";
import {
  createFindAgencies200,
  createFindBoroughs200,
  createFindCapitalProjects200,
  createFindCommunityBoardBudgetRequests200,
  createFindFacilities200,
} from "~/gen/mocks";

const ParentWithContext = () => {
  const [hoveredOverItem, setHoveredOverItem] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const clearRadiusFilter = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("radius");
      return next;
    });
  };

  return (
    <Outlet
      context={{
        hoveredOverItem,
        setHoveredOverItem,
        clearRadiusFilter,
        isPanelOpen,
        setIsPanelOpen,
      }}
    />
  );
};

describe("Results Panel", () => {
  const agenciesResponse = createFindAgencies200();
  const boroughsResponse = createFindBoroughs200({
    boroughs: [{ id: "1", title: "Manhattan", abbr: "MN" }],
  });
  const budgetRequestsResponse = createFindCommunityBoardBudgetRequests200();
  const capitalProjectsResponse = createFindCapitalProjects200();
  const facilitiesResponse = createFindFacilities200();
  const loader = async () => {
    return {
      agenciesResponse,
      budgetRequestsResponse,
      capitalProjectsResponse,
      facilitiesResponse,
      boroughsResponse,
    };
  };

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: ParentWithContext,
      children: [
        {
          id: "layouts/ResultsPanel",
          Component: ResultsPanelMain,
          loader,
          HydrateFallback: () => <></>,
          children: [
            { path: "capital-projects", Component: () => null },
            {
              path: "community-board-budget-requests",
              Component: () => null,
            },
            { path: "facilities", Component: () => null },
          ],
        },
      ],
    },
  ]);

  it("should render capital projects", async () => {
    render(<Stub initialEntries={["/capital-projects"]} />);

    await waitFor(() => screen.getAllByText(/Budget Requests/));
    await waitFor(() => screen.getAllByText(/Capital Projects/));
    await waitFor(() => screen.getByText(/Export Data/));
  });

  it("should switch tabs from capital projects to community board budget requests", async () => {
    render(<Stub initialEntries={["/capital-projects"]} />);
    await userEvent.click(
      await screen.findByRole("button", { name: "Results panel" }),
    );
    await waitFor(() =>
      screen.getByText(
        new RegExp(capitalProjectsResponse.totalProjects.toString()),
      ),
    );
    await userEvent.click(
      screen.getByRole("tab", { name: /Budget.*Requests/ }),
    );
    await waitFor(() =>
      expect(
        screen.getByRole("tab", { name: /Budget.*Requests/ }),
      ).toHaveAttribute("aria-selected", "true"),
    );
  });

  it("should render community board budget requests", async () => {
    render(<Stub initialEntries={["/community-board-budget-requests"]} />);

    await waitFor(() => screen.getAllByText(/Budget Requests/));
    await waitFor(() => screen.getAllByText(/Capital Projects/));
  });

  it("selected location section should not render when no locations are selected", async () => {
    render(<Stub initialEntries={["/capital-projects"]} />);
    await waitFor(() => screen.getByText(/Results/));
    expect(screen.queryByText("SELECTED LOCATIONS")).not.toBeInTheDocument();
  });

  it("selected location section should render ccd tag when boundaryType and boundaryId params are set", async () => {
    render(
      <Stub
        initialEntries={["/capital-projects?boundaryType=ccd&boundaryId=50"]}
      />,
    );
    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await waitFor(() => screen.getByText("City Council"));
    await waitFor(() => screen.getByText(/\| 50/));
  });

  it("selected location section should render cd tag with borough and district when cd params are set", async () => {
    const [{ id, title }] = boroughsResponse.boroughs;

    render(
      <Stub
        initialEntries={[
          `/capital-projects?boundaryType=cd&boroughId=${id}&boundaryId=01`,
        ]}
      />,
    );
    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await waitFor(() => screen.getAllByText(title));
    await waitFor(() => screen.getAllByText(/\| CD 01/));
  });

  it("selected location section should render borough tag when borough params are set", async () => {
    const [{ id, title }] = boroughsResponse.boroughs;

    render(
      <Stub
        initialEntries={[
          `/capital-projects?boundaryType=borough&boroughIds=${id}`,
        ]}
      />,
    );
    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await waitFor(() => screen.getByText(title));
  });

  it("clicking the tag X on ccd tag clears ccd params from the url", async () => {
    render(
      <Stub
        initialEntries={[`/capital-projects?boundaryType=ccd&boundaryId=50`]}
      />,
    );
    await waitFor(() => screen.getByText("City Council"));
    const closeIcon = screen.getByLabelText("closeIcon");
    await userEvent.click(closeIcon);
    await waitFor(() =>
      expect(screen.queryByText("City Council")).not.toBeInTheDocument(),
    );
    expect(screen.queryByText("SELECTED LOCATIONS")).not.toBeInTheDocument();
  });

  it("in the selected location section, clicking the tag X on cd tag clears cd params from the url", async () => {
    const [{ id, title }] = boroughsResponse.boroughs;

    render(
      <Stub
        initialEntries={[
          `/capital-projects?boundaryType=cd&boroughId=${id}&boundaryId=01`,
        ]}
      />,
    );

    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await waitFor(() => screen.getByText(title));
    await waitFor(() => screen.getByText(/\| CD 01/));
    const closeIcon = screen.getByLabelText("closeIcon");
    await userEvent.click(closeIcon);
    await waitFor(() =>
      expect(screen.queryByText("SELECTED LOCATIONS")).not.toBeInTheDocument(),
    );
  });

  it("in the selected location section, clicking the tag X on borough tag clears borough params from the url", async () => {
    const [{ id, title }] = boroughsResponse.boroughs;

    render(
      <Stub
        initialEntries={[
          `/capital-projects?boundaryType=borough&boroughIds=${id}`,
        ]}
      />,
    );

    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await waitFor(() => screen.getByText(title));
    const closeIcon = screen.getByLabelText("closeIcon");
    await userEvent.click(closeIcon);
    await waitFor(() =>
      expect(screen.queryByText("SELECTED LOCATIONS")).not.toBeInTheDocument(),
    );
  });

  it("in the selected location section, clicking Clear removes all boundary params and hides selected location section", async () => {
    const [{ id, title }] = boroughsResponse.boroughs;

    render(
      <Stub
        initialEntries={[
          `/capital-projects?boundaryType=cd&boroughId=${id}&boundaryId=10`,
        ]}
      />,
    );
    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await waitFor(() => screen.getByText(title));
    await userEvent.click(screen.getByText("Clear"));
    await waitFor(() =>
      expect(screen.queryByText("SELECTED LOCATIONS")).not.toBeInTheDocument(),
    );
  });

  it("selected location section should render the radius tag when radius param is set", async () => {
    render(
      <Stub
        initialEntries={[
          "/capital-projects?boroughIds=4&search=2547+MILL+AVENUE%2C+Brooklyn&pin=-73.911116%2C40.609715&radius=400",
        ]}
      />,
    );
    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await waitFor(() => screen.getByText("Radius"));
    await waitFor(() => screen.getByText(/0\.08 mi/));
  });

  it("clicking the X icon on the radius tag clears radius param and hides selected location section", async () => {
    render(
      <Stub
        initialEntries={[
          "/capital-projects?boroughIds=4&search=2547+MILL+AVENUE%2C+Brooklyn&pin=-73.911116%2C40.609715&radius=400",
        ]}
      />,
    );

    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await waitFor(() => screen.getByText("Radius"));
    const closeIcon = screen.getByLabelText("closeIcon");
    await userEvent.click(closeIcon);
    await waitFor(() =>
      expect(screen.queryByText("SELECTED LOCATIONS")).not.toBeInTheDocument(),
    );
  });

  it("clicking the clear button when radius is set, clears the radius param and hides selected location section", async () => {
    render(
      <Stub
        initialEntries={[
          "/capital-projects?boroughIds=4&search=2547+MILL+AVENUE%2C+Brooklyn&pin=-73.911116%2C40.609715&radius=400",
        ]}
      />,
    );
    await waitFor(() => screen.getByText("SELECTED LOCATIONS"));
    await userEvent.click(screen.getByText("Clear"));
    await waitFor(() =>
      expect(screen.queryByText("SELECTED LOCATIONS")).not.toBeInTheDocument(),
    );
  });
});
