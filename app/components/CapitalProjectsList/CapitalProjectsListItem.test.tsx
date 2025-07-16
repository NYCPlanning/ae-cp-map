import { render, screen } from "@testing-library/react";
import { Agency, CapitalProjectBudgeted, createCapitalProject } from "~/gen";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";
import { BrowserRouter } from "react-router";

describe("CapitalProjectsListItem", () => {
  let capitalProject: CapitalProjectBudgeted;
  let agencies: Agency[];

  beforeAll(() => {
    agencies = [
      { initials: "DDC", name: "Department of Design and Construction" },
      { initials: "DEP", name: "Department of Environmental Protection" },
    ];
    capitalProject = createCapitalProject() as CapitalProjectBudgeted;
  });

  it("should render the capital project list item with description as title", () => {
    render(
      // need to wrap in browser component to avoid https://github.com/remix-run/react-router/issues/9187
      <BrowserRouter>
        <CapitalProjectsListItem
          capitalProject={capitalProject}
          agency={agencies[0].name}
          yearRange="FY2024"
        />
      </BrowserRouter>,
    );
    expect(screen.getByText(capitalProject.description)).toBeVisible();
  });

  it("should render the capital project list item with agency", () => {
    render(
      // need to wrap in browser component to avoid https://github.com/remix-run/react-router/issues/9187
      <BrowserRouter>
        <CapitalProjectsListItem
          capitalProject={capitalProject}
          agency={agencies[0].name}
          yearRange="FY2024"
        />
      </BrowserRouter>,
    );
    expect(screen.getByText(agencies[0].name)).toBeVisible();
  });

  it("should render the capital project list item with year", () => {
    render(
      // need to wrap in browser component to avoid https://github.com/remix-run/react-router/issues/9187
      <BrowserRouter>
        <CapitalProjectsListItem
          capitalProject={capitalProject}
          agency={agencies[0].name}
          yearRange="FY2024"
        />
      </BrowserRouter>,
    );
    expect(screen.getByText("FY2024")).toBeVisible();
  });

  it("hovering over list item should highlight project on map", () => {
    render(
      // need to wrap in browser component to avoid https://github.com/remix-run/react-router/issues/9187
      <BrowserRouter>
        <CapitalProjectsListItem
          capitalProject={capitalProject}
          agency={agencies[0].name}
          yearRange="FY2024"
        />
      </BrowserRouter>,
    );
  });
});
