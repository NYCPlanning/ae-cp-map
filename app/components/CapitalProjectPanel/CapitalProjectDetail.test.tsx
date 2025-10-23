import { CapitalProjectDetail } from "./CapitalProjectDetail";
import {
  CapitalProjectBudgeted,
  createCapitalProjectBudgeted,
  Agency,
} from "~/gen";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

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

  it("should render the detail panel with project description", () => {
    render(
      <CapitalProjectDetail
        capitalProject={capitalProject}
        capitalCommitments={[]}
        managingAgencies={managingAgencies}
        onNavigationClick={onNavigationClick}
      />,
    );
    expect(screen.getByText(capitalProject.description)).toBeVisible();
  });

  it("should render the name of the managing agency", () => {
    render(
      <CapitalProjectDetail
        capitalProject={capitalProject}
        capitalCommitments={[]}
        managingAgencies={managingAgencies}
        onNavigationClick={onNavigationClick}
      />,
    );
    expect(screen.getByText(managingAgencies[0].name)).toBeVisible();
  });

  it("should call onClose when the back chevron is clicked", async () => {
    render(
      <CapitalProjectDetail
        capitalProject={capitalProject}
        capitalCommitments={[]}
        managingAgencies={managingAgencies}
        onNavigationClick={onNavigationClick}
      />,
    );

    await userEvent.click(screen.getByLabelText("Close project detail panel"));
    expect(onNavigationClick).toHaveBeenCalled();
  });

  it("should assign dates after July to the following fiscal year", () => {
    capitalProject.minDate = "2018-08-03";
    capitalProject.maxDate = "2018-08-03";
    render(
      <CapitalProjectDetail
        capitalProject={capitalProject}
        capitalCommitments={[]}
        managingAgencies={managingAgencies}
        onNavigationClick={onNavigationClick}
      />,
    );
    expect(screen.getByText("FY2019")).toBeVisible();
  });

  it("should contain the labels from the commitments timeline", () => {
    render(
      <CapitalProjectDetail
        capitalProject={capitalProject}
        capitalCommitments={[]}
        managingAgencies={managingAgencies}
        onNavigationClick={onNavigationClick}
      />,
    );
    expect(screen.getByText(/Past/)).toBeVisible();
    expect(screen.getByText(/Current/)).toBeVisible();
    expect(screen.getByText(/Future/)).toBeVisible();
  });
});
