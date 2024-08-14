import { render, screen } from "@testing-library/react";
import { CapitalProjectDetailPanel } from ".";
import {
  Agency,
  CapitalProjectBudgeted,
  createCapitalProjectBudgeted,
} from "~/gen";

describe("CapitalProjectDetailPanel", () => {
  let capitalProject: CapitalProjectBudgeted;
  let agencies: Agency[];
  let onNavigationClick: () => void;
  beforeAll(() => {
    agencies = [
      { initials: "DDC", name: "Department of Design and Construction" },
      { initials: "DEP", name: "Department of Environmental Protection" },
    ];
    capitalProject = {
      ...createCapitalProjectBudgeted(),
      managingAgency: "DDC",
      sponsoringAgencies: ["DEP"],
    };
  });

  beforeEach(() => {
    onNavigationClick = vi.fn();
  });

  it("should render a resize bar", () => {
    render(
      <CapitalProjectDetailPanel
        capitalProject={capitalProject}
        agencies={agencies}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByLabelText(/Expand/)).toBeVisible();
  });

  it("should render capital project details", () => {
    render(
      <CapitalProjectDetailPanel
        capitalProject={capitalProject}
        agencies={agencies}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(capitalProject.description)).toBeVisible();
  });
});
