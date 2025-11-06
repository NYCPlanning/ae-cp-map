import { AgencyBudget, createAgencyBudget } from "~/gen";
import { ProjectTypeDropdown } from "./ProjectTypeDropdown";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("ProjectTypeDropdown", () => {
  let agencyBudgets: Array<AgencyBudget> = [];
  beforeAll(() => {
    agencyBudgets = Array.from(Array(1), () => createAgencyBudget());
  });

  it("should render project type form details and options", () => {
    const onSelectValueChange = vi.fn();
    render(
      <ProjectTypeDropdown
        onSelectValueChange={onSelectValueChange}
        projectTypes={agencyBudgets}
      />,
    );
    expect(screen.getByLabelText("Project Type")).toBeInTheDocument();
    const firstAgencyBudgetLabel = `${agencyBudgets[0].type}`;
    expect(screen.getByText(firstAgencyBudgetLabel)).toBeInTheDocument();
  });

  it("should run onSelectValueChange when changing the selected project type", async () => {
    const onSelectValueChange = vi.fn();
    const firstAgencyBudgetCode = agencyBudgets[0].code;
    render(
      <ProjectTypeDropdown
        onSelectValueChange={onSelectValueChange}
        projectTypes={agencyBudgets}
      />,
    );

    await act(() =>
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        firstAgencyBudgetCode,
      ),
    );
    expect(onSelectValueChange).toHaveBeenCalledWith(firstAgencyBudgetCode);
  });
});
