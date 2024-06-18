import { CapitalProjectDetailPanel } from "./CapitalProjectDetailPanel";
import {
  CapitalProjectBudgeted,
  createCapitalProjectBudgeted,
  Agency,
} from "~/gen";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("CapitalProjectDetailPanel", () => {
  let capitalProject: CapitalProjectBudgeted;
  let agencies: Agency[];
  const onClose = vi.fn();
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

  it("should render the detail panel with project description", () => {
    render(
      <CapitalProjectDetailPanel
        capitalProject={capitalProject}
        agencies={agencies}
        onClose={onClose}
      />,
    );
    expect(screen.getByText(capitalProject.description)).toBeVisible();
  });

  it("should render the name of the managing agency", () => {
    render(
      <CapitalProjectDetailPanel
        capitalProject={capitalProject}
        agencies={agencies}
        onClose={onClose}
      />,
    );
    expect(screen.getByText(agencies[0].name)).toBeVisible();
  });

  it("should render the name of the sponsoring agency", () => {
    render(
      <CapitalProjectDetailPanel
        capitalProject={capitalProject}
        agencies={agencies}
        onClose={onClose}
      />,
    );
    expect(screen.getByText(agencies[1].name)).toBeVisible();
  });

  it("should call onClose when the back chevron is clicked", async () => {
    render(
      <CapitalProjectDetailPanel
        capitalProject={capitalProject}
        agencies={agencies}
        onClose={onClose}
      />,
    );

    await userEvent.click(screen.getByLabelText("Close project detail panel"));
    expect(onClose).toHaveBeenCalled();
  });

  it("should assign dates after July to the following fiscal year", () => {
    capitalProject.minDate = "2018-08-03";
    capitalProject.maxDate = "2018-08-03";
    render(
      <CapitalProjectDetailPanel
        capitalProject={capitalProject}
        agencies={agencies}
        onClose={onClose}
      />,
    );
    expect(screen.getByText("FY2019")).toBeVisible();
  });
});
