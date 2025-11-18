import {
  CommunityBoardBudgetRequestAgencyCategoryResponse,
  createCommunityBoardBudgetRequestAgencyCategoryResponse,
} from "../../gen";
import { CbbrAgencyCategoryResponseCheckbox } from ".";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";
import { render, screen } from "@testing-library/react";

describe("CbbrAgencyCategoryResponseCheckbox", () => {
  let cbbrAgencyCategoryResponses: Array<CommunityBoardBudgetRequestAgencyCategoryResponse> =
    [];
  const id = 0;
  beforeAll(() => {
    cbbrAgencyCategoryResponses = Array.from(Array(1), () =>
      createCommunityBoardBudgetRequestAgencyCategoryResponse({
        id,
      }),
    );
  });

  it("should render community board budget request agency category responses checkbox form details and options", () => {
    const updateSearchParams = vi.fn();
    const selectedIds = [id];
    const isChecked = selectedIds.includes(id);
    render(
      <CbbrAgencyCategoryResponseCheckbox
        key={id}
        isChecked={isChecked}
        onCheckedChange={updateSearchParams}
        cbbrAgencyCategoryResponses={cbbrAgencyCategoryResponses}
        selectedIds={[String(id)]}
      />,
    );

    expect(screen.getByLabelText("Agency Response")).toBeInTheDocument();
    const cbbrAgencyCategoryResponse =
      cbbrAgencyCategoryResponses[0].description;
    expect(screen.getByText(cbbrAgencyCategoryResponse)).toBeInTheDocument();
  });

  it("should set search params when community board budget request agency category responses is an empty array", async () => {
    const updateSearchParams = vi.fn();
    const selectedIds = [id];
    const isChecked = selectedIds.includes(id);
    const firstCommunityBoardBudgetRequestAgencyCategoryResponseId =
      cbbrAgencyCategoryResponses[0].id;
    render(
      <CbbrAgencyCategoryResponseCheckbox
        selectedIds={[]}
        onCheckedChange={updateSearchParams}
        isChecked={isChecked}
        key={firstCommunityBoardBudgetRequestAgencyCategoryResponseId}
        cbbrAgencyCategoryResponses={cbbrAgencyCategoryResponses}
      />,
    );

    await act(() => userEvent.click(screen.getByRole("checkbox")));
    expect(updateSearchParams).toHaveBeenCalledWith("0");
  });
});
