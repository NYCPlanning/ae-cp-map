import { render, screen, waitFor } from "@testing-library/react";
import ResultsPanelMain from "./ResultsPanel";
import { createRoutesStub } from "react-router";
import {
  createFindAgencies200,
  createFindBoroughs200,
  createFindCapitalProjects200,
  createFindCommunityBoardBudgetRequests200,
} from "~/gen/mocks";

describe("Results Panel", () => {
  const agenciesResponse = createFindAgencies200();
  const boroughsResponse = createFindBoroughs200();
  const budgetRequestsResponse = createFindCommunityBoardBudgetRequests200();
  const capitalProjectsResponse = createFindCapitalProjects200();
  const loader = async () => {
    return {
      agenciesResponse,
      budgetRequestsResponse,
      capitalProjectsResponse,
      boroughsResponse,
    };
  };

  const Stub = createRoutesStub([
    {
      path: "/capital-projects",
      Component: ResultsPanelMain,
      loader,
      HydrateFallback: () => <></>,
    },
    {
      path: "/community-board-budget-requests",
      Component: ResultsPanelMain,
      loader,
      HydrateFallback: () => <></>,
    },
  ]);

  it("should render capital projects", async () => {
    render(<Stub initialEntries={["/capital-projects"]} />);
    await waitFor(() =>
      screen.getByText(
        `${capitalProjectsResponse.totalProjects + budgetRequestsResponse.totalBudgetRequests} Results`,
      ),
    );
    await waitFor(() => screen.getByText(/Community Board Budget Requests/));
    await waitFor(() => screen.getByText(/Capital Projects/));
    await waitFor(() => screen.getByText(/Export Data/));
  });

  it("should switch tabs from capital projects to community board budget requests", async () => {
    render(<Stub initialEntries={["/capital-projects"]} />);
    await waitFor(() =>
      screen.getByText(
        new RegExp(capitalProjectsResponse.totalProjects.toString()),
      ),
    );
    const budgetRequestTab = screen.getByText(
      /Community Board Budget Requests/,
    );
    await waitFor(() => budgetRequestTab.click());
    await waitFor(() =>
      screen.getByText(
        new RegExp(budgetRequestsResponse.totalBudgetRequests.toString()),
      ),
    );
  });

  it("should render community board budget requests", async () => {
    render(<Stub initialEntries={["/community-board-budget-requests"]} />);
    await waitFor(() =>
      screen.getByText(
        `${budgetRequestsResponse.totalBudgetRequests + capitalProjectsResponse.totalProjects} Results`,
      ),
    );
    await waitFor(() => screen.getByText(/Community Board Budget Requests/));
    await waitFor(() => screen.getByText(/Capital Projects/));
  });
});
