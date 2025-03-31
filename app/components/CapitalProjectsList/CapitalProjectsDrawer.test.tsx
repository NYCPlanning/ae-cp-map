import { render, screen } from "@testing-library/react";
import { CapitalProjectsDrawer } from "./CapitalProjectsDrawer";
import { BrowserRouter } from "react-router-dom";

describe("CapitalProjectsDrawer", () => {
  it("should render a district title", () => {
    const district = "City Council District 23";
    render(
      <BrowserRouter>
        <CapitalProjectsDrawer
          capitalProjects={[]}
          district={district}
          agencies={[]}
          agencyBudgets={[]}
        >
          <></>
        </CapitalProjectsDrawer>
      </BrowserRouter>,
    );
    expect(screen.getByText(/District 23/)).toBeInTheDocument();
  });

  it("should render a bar to expand project list panel", () => {
    const district = "City Council District 23";
    render(
      <BrowserRouter>
        <CapitalProjectsDrawer
          capitalProjects={[]}
          district={district}
          agencies={[]}
          agencyBudgets={[]}
        >
          <></>
        </CapitalProjectsDrawer>
      </BrowserRouter>,
    );
    expect(screen.getByLabelText("Expand panel")).toBeInTheDocument();
  });

  it("should render a title for the project list", () => {
    const district = "City Council District 23";
    render(
      <BrowserRouter>
        <CapitalProjectsDrawer
          capitalProjects={[]}
          district={district}
          agencies={[]}
          agencyBudgets={[]}
        >
          <></>
        </CapitalProjectsDrawer>
      </BrowserRouter>,
    );
    expect(screen.getByText(/Mapped Capital Projects/)).toBeInTheDocument();
  });
});
