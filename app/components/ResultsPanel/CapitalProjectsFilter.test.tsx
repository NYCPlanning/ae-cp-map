import { render, screen, waitFor } from "@testing-library/react";
import CapitalProjectsFilter from "./CapitalProjectsFilter";
import { createRoutesStub } from "react-router";

describe("Capital projects filter", () => {
  it("should render with warning", async () => {
    const loader = async () => {
      return {};
    };

    const Stub = createRoutesStub([
      {
        path: "/capital-projects",
        Component: CapitalProjectsFilter,
        loader,
      },
    ]);

    render(<Stub initialEntries={["/capital-projects"]} />);
    await waitFor(() => screen.getByText(/Filter/));
    await waitFor(() => screen.getByText(/Selected/));
  });
});
