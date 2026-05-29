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
    render(
      <CbbrAgencyCategoryResponseCheckbox
        key={id}
        onCheckedChange={updateSearchParams}
        dismissWelcomeAndUpdateSearchParams={() => null}
      />,
    );
    //TODO: Refactor tests to work with zustand store
    // expect(screen.getByLabelText("Agency Response")).toBeInTheDocument();
    // const cbbrAgencyCategoryResponse =
    // cbbrAgencyCategoryResponses[0].description;
    // expect(screen.getByText(cbbrAgencyCategoryResponse)).toBeInTheDocument();
  });

  it("should set search params when community board budget request agency category responses is an empty array", async () => {
    const updateSearchParams = vi.fn();
    const firstCommunityBoardBudgetRequestAgencyCategoryResponseId =
      cbbrAgencyCategoryResponses[0].id;
    render(
      <CbbrAgencyCategoryResponseCheckbox
        onCheckedChange={updateSearchParams}
        key={firstCommunityBoardBudgetRequestAgencyCategoryResponseId}
        dismissWelcomeAndUpdateSearchParams={() => null}
      />,
    );

    await act(() => userEvent.click(screen.getAllByRole("checkbox")[1]));
    // expect(updateSearchParams).toHaveBeenCalledWith("0");
  });
});
