import { render, screen } from "@testing-library/react";
import {
  Agency,
  CapitalProjectBudgeted,
  createCapitalProjectBudgeted,
} from "~/gen";
import { CapitalProjectPanel } from ".";

describe("CapitalProjectPanel", () => {
  let capitalProject: CapitalProjectBudgeted;
  let managingAgencies: Agency[];
  let onNavigationClick: () => void;
  beforeAll(() => {
    managingAgencies = [
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
      <CapitalProjectPanel
        capitalProject={capitalProject}
        capitalCommitments={[]}
        capitalCommitmentTypes={[]}
        managingAgencies={managingAgencies}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByLabelText(/Expand/)).toBeVisible();
  });

  it("should render capital project details", () => {
    render(
      <CapitalProjectPanel
        capitalProject={capitalProject}
        capitalCommitments={[]}
        capitalCommitmentTypes={[]}
        managingAgencies={managingAgencies}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(capitalProject.description)).toBeVisible();
  });

  it("should render commitments", () => {
    render(
      <CapitalProjectPanel
        capitalProject={capitalProject}
        capitalCommitments={[]}
        capitalCommitmentTypes={[]}
        managingAgencies={managingAgencies}
        onNavigationClick={onNavigationClick}
      />,
    );

    expect(screen.getByText(/Commitments/)).toBeVisible();
  });
});
