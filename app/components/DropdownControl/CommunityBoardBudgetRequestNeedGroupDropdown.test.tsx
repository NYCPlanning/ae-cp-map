import { render, screen } from "@testing-library/react";
import { CommunityBoardBudgetRequestNeedGroupDropdown } from "./CommunityBoardBudgetRequestNeedGroupDropdown";
import {
  CommunityBoardBudgetRequestNeedGroup,
  createCommunityBoardBudgetRequestNeedGroup,
} from "~/gen";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("CommunityBoardBudgetRequestNeedGroupDropdown", () => {
  let cbbrNeedGroups: Array<CommunityBoardBudgetRequestNeedGroup> = [];
  const id = 1;
  beforeAll(() => {
    cbbrNeedGroups = Array.from(Array(1), () =>
      createCommunityBoardBudgetRequestNeedGroup({
        id,
      }),
    );
  });

  it("should render community board budget request needs group form details and options", () => {
    const updateSearchParams = vi.fn();
    render(
      <CommunityBoardBudgetRequestNeedGroupDropdown
        id={id}
        onSelectValueChange={updateSearchParams}
        cbbrNeedGroups={cbbrNeedGroups}
      />,
    );

    expect(screen.getByLabelText("Needs Group")).toBeInTheDocument();
    const firstNeedGroupDescription = cbbrNeedGroups[0].description;
    expect(screen.getByText(firstNeedGroupDescription)).toBeInTheDocument();
  });

  it("should set search params when community board budget request needs group is null", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestNeedGroupId = cbbrNeedGroups[0].id;
    render(
      <CommunityBoardBudgetRequestNeedGroupDropdown
        id={null}
        onSelectValueChange={updateSearchParams}
        selectValue={firstCommunityBoardBudgetRequestNeedGroupId}
        cbbrNeedGroups={cbbrNeedGroups}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(updateSearchParams).toHaveBeenCalledWith(null);
  });

  it("should set search params when nextCbbrNeedGroupId is empty", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestNeedGroupId = cbbrNeedGroups[0].id;

    render(
      <CommunityBoardBudgetRequestNeedGroupDropdown
        id={id}
        onSelectValueChange={updateSearchParams}
        selectValue={firstCommunityBoardBudgetRequestNeedGroupId}
        cbbrNeedGroups={cbbrNeedGroups}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(updateSearchParams).toHaveBeenCalledWith(null);
  });

  it("should set search params when nextCbbrNeedGroupId has a value", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestNeedGroupId =
      cbbrNeedGroups[0].id.toString();
    render(
      <CommunityBoardBudgetRequestNeedGroupDropdown
        id={id}
        onSelectValueChange={updateSearchParams}
        selectValue={null}
        cbbrNeedGroups={cbbrNeedGroups}
      />,
    );

    await act(() =>
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        firstCommunityBoardBudgetRequestNeedGroupId,
      ),
    );
    expect(updateSearchParams).toHaveBeenCalledWith(id.toString());
  });
});
