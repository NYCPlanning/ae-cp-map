import { render, screen } from "@testing-library/react";
import { CommunityBoardBudgetRequestAgencyDropdown } from "./CommunityBoardBudgetRequestAgencyDropdown";
import { Agency, createAgency } from "~/gen";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("CommunityBoardBudgetRequestAgencyDropdown", () => {
  let cbbrAgencies: Array<Agency> = [];
  const initials = "NYPL";
  beforeAll(() => {
    cbbrAgencies = Array.from(Array(1), () =>
      createAgency({
        initials,
      }),
    );
  });

  it("should render community board budget request agencies form details and options", () => {
    const updateSearchParams = vi.fn();
    render(
      <CommunityBoardBudgetRequestAgencyDropdown
        cbbrAgencyInitials={initials}
        onSelectValueChange={updateSearchParams}
        cbbrAgencies={cbbrAgencies}
      />,
    );

    expect(screen.getByLabelText("Agency")).toBeInTheDocument();
    const nextCbbrAgencyInitials = new RegExp(cbbrAgencies[0].initials);
    expect(screen.getByText(nextCbbrAgencyInitials)).toBeInTheDocument();
  });

  it("should set search params when community board budget request agency initials is null", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetAgencyInitialsId = cbbrAgencies[0].initials;
    render(
      <CommunityBoardBudgetRequestAgencyDropdown
        cbbrAgencyInitials={null}
        onSelectValueChange={updateSearchParams}
        selectValue={firstCommunityBoardBudgetAgencyInitialsId}
        cbbrAgencies={cbbrAgencies}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(updateSearchParams).toHaveBeenCalledWith(null);
  });

  it("should set search params when nextCbbrAgencyInitials is empty", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestAgencyInitials =
      cbbrAgencies[0].initials;

    render(
      <CommunityBoardBudgetRequestAgencyDropdown
        cbbrAgencyInitials={initials}
        onSelectValueChange={updateSearchParams}
        selectValue={firstCommunityBoardBudgetRequestAgencyInitials}
        cbbrAgencies={cbbrAgencies}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(updateSearchParams).toHaveBeenCalledWith(null);
  });

  it("should set search params when nextCbbrAgencyInitials has a value", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestAgencyInitialsId =
      cbbrAgencies[0].initials;
    render(
      <CommunityBoardBudgetRequestAgencyDropdown
        cbbrAgencyInitials={initials}
        onSelectValueChange={updateSearchParams}
        selectValue={null}
        cbbrAgencies={cbbrAgencies}
      />,
    );

    await act(() =>
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        firstCommunityBoardBudgetRequestAgencyInitialsId,
      ),
    );
    expect(updateSearchParams).toHaveBeenCalledWith(initials);
  });
});
