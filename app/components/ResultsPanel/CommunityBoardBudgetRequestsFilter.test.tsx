import { render, screen, waitFor } from "@testing-library/react";
import CommunityBoardBudgetRequestsFilter from "./CommunityBoardBudgetRequestsFilter";
import { createRoutesStub } from "react-router";

describe("Community board budget request filter", () => {
  it("should render filter", async () => {
    const loader = async () => {
      return {};
    };

    const Stub = createRoutesStub([
      {
        path: "/community-board-budget-requests",
        Component: CommunityBoardBudgetRequestsFilter,
        loader,
        HydrateFallback: () => <></>,
      },
    ]);

    render(<Stub initialEntries={["/community-board-budget-requests"]} />);
    await waitFor(() => screen.getByText(/Filter/));
    await waitFor(() => screen.getByText(/Selected/));
  });
});
