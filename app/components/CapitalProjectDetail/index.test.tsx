import { render, screen } from "@testing-library/react";
import {
  Agency,
  CapitalProjectBudgeted,
  createCapitalProjectBudgeted,
} from "~/gen";
import { CapitalProjectDetail } from ".";

describe("CapitalProjectDetail", () => {
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

  it("should render capital project details", () => {
    render(
      <CapitalProjectDetail
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
      <CapitalProjectDetail
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
