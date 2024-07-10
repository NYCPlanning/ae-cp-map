import { render, screen } from "@testing-library/react";
import { Agency, CapitalProject, createCapitalProject } from "~/gen";
import { CapitalProjectsListItem } from "./CapitalProjectsListItem";

describe("CapitalProjectsListItem", () => {
  let capitalProject: CapitalProject;
  let agencies: Agency[];

  beforeAll(() => {
    agencies = [
      { initials: "DDC", name: "Department of Design and Construction" },
      { initials: "DEP", name: "Department of Environmental Protection" },
    ];
    capitalProject = createCapitalProject();
  });

  it("should render the capital project list item with description as title", () => {
    render(
      <CapitalProjectsListItem
        description={capitalProject.description}
        agency={agencies[0].name}
        yearRange="FY2024"
      />,
    );
    expect(screen.getByText(capitalProject.description)).toBeVisible();
  });

  it("should render the capital project list item with agency", () => {
    render(
      <CapitalProjectsListItem
        description={capitalProject.description}
        agency={agencies[0].name}
        yearRange="FY2024"
      />,
    );
    expect(screen.getByText(agencies[0].name)).toBeVisible();
  });

  it("should render the capital project list item with year", () => {
    render(
      <CapitalProjectsListItem
        description={capitalProject.description}
        agency={agencies[0].name}
        yearRange="FY2024"
      />,
    );
    expect(screen.getByText("FY2024")).toBeVisible();
  });

  it("hovering over list item should highlight project on map", () => {
    render(
      <CapitalProjectsListItem
        description={capitalProject.description}
        agency={agencies[0].name}
        yearRange="FY2024"
      />,
    );
    // how to test this ...🤔
  });
});
