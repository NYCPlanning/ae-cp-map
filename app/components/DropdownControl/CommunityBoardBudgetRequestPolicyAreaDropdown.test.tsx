import { render, screen } from "@testing-library/react";
import { CommunityBoardBudgetRequestPolicyAreaDropdown } from "./CommunityBoardBudgetRequestPolicyAreaDropdown";
import {
  CommunityBoardBudgetRequestPolicyArea,
  createCommunityBoardBudgetRequestPolicyArea,
} from "~/gen";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";

describe("CommunityBoardBudgetRequestPolicyAreaDropdown", () => {
  let cbbrPolicyAreas: Array<CommunityBoardBudgetRequestPolicyArea> = [];
  const id = 1;
  beforeAll(() => {
    cbbrPolicyAreas = Array.from(Array(1), () =>
      createCommunityBoardBudgetRequestPolicyArea({
        id,
      }),
    );
  });

  it("should render community board budget request policy area form details and options", () => {
    const updateSearchParams = vi.fn();
    render(
      <CommunityBoardBudgetRequestPolicyAreaDropdown
        id={id}
        onSelectValueChange={updateSearchParams}
        cbbrPolicyAreas={cbbrPolicyAreas}
      />,
    );

    expect(screen.getByLabelText("Policy Area")).toBeInTheDocument();
    const firstCommunityDistrictDescription = cbbrPolicyAreas[0].description;
    expect(
      screen.getByText(firstCommunityDistrictDescription),
    ).toBeInTheDocument();
  });

  it("should set search params when community board budget request policy area is null", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestPolicyAreaId = cbbrPolicyAreas[0].id;
    render(
      <CommunityBoardBudgetRequestPolicyAreaDropdown
        id={null}
        onSelectValueChange={updateSearchParams}
        selectValue={firstCommunityBoardBudgetRequestPolicyAreaId}
        cbbrPolicyAreas={cbbrPolicyAreas}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(updateSearchParams).toHaveBeenCalledWith(null);
  });

  it("should set search params when nextCbbrNeedGroupId is empty", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestPolicyAreaId = cbbrPolicyAreas[0].id;

    render(
      <CommunityBoardBudgetRequestPolicyAreaDropdown
        id={id}
        onSelectValueChange={updateSearchParams}
        selectValue={firstCommunityBoardBudgetRequestPolicyAreaId}
        cbbrPolicyAreas={cbbrPolicyAreas}
      />,
    );

    await act(() => userEvent.selectOptions(screen.getByRole("combobox"), ""));
    expect(updateSearchParams).toHaveBeenCalledWith(null);
  });

  it("should set search params when nextCbbrNeedGroupId has a value", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestPolicyAreaId =
      cbbrPolicyAreas[0].id.toString();
    render(
      <CommunityBoardBudgetRequestPolicyAreaDropdown
        id={id}
        onSelectValueChange={updateSearchParams}
        selectValue={null}
        cbbrPolicyAreas={cbbrPolicyAreas}
      />,
    );

    await act(() =>
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        firstCommunityBoardBudgetRequestPolicyAreaId,
      ),
    );
    expect(updateSearchParams).toHaveBeenCalledWith(id.toString());
  });
});
