import { render, screen } from "@testing-library/react";
import { CapitalProjectsDrawer } from "./CapitalProjectsDrawer";
import { BrowserRouter } from "react-router-dom";

describe("CapitalProjectsDrawer", () => {
  it("should render a bar to expand project list panel", () => {
    render(
      <BrowserRouter>
        <CapitalProjectsDrawer
          capitalProjects={[]}
          agencies={[]}
          agencyBudgets={[]}
          capitalProjectsTotal={2}
        >
          <></>
        </CapitalProjectsDrawer>
      </BrowserRouter>,
    );
    expect(screen.getByLabelText("Expand panel")).toBeInTheDocument();
  });

  it("should render a title for the project list", () => {
    render(
      <BrowserRouter>
        <CapitalProjectsDrawer
          capitalProjects={[]}
          agencies={[]}
          agencyBudgets={[]}
          capitalProjectsTotal={2}
        >
          <></>
        </CapitalProjectsDrawer>
      </BrowserRouter>,
    );
    expect(screen.getByText(/2 Results/)).toBeInTheDocument();
  });
});
