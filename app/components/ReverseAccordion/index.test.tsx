import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ReverseAccordion } from ".";

describe("CommunityBoardBudgetRequestPanel", () => {
  it("should render the accordion panel with the given title", () => {
    render(
      <ReverseAccordion accordionHeading="CBBR Title">
        CBBR Content
      </ReverseAccordion>,
    );

    expect(screen.getByText(/CBBR Title/)).toBeVisible();
  });

  it("should render the accordion panel in the closed state", () => {
    render(
      <ReverseAccordion accordionHeading="CBBR Title">
        CBBR Content
      </ReverseAccordion>,
    );

    expect(screen.getByText(/CBBR Content/)).not.toBeVisible();
  });

  it("should open the accordion panel when the title is clicked", async () => {
    render(
      <ReverseAccordion accordionHeading="CBBR Title">
        CBBR Content
      </ReverseAccordion>,
    );

    await userEvent.click(screen.getByText(/CBBR Title/));
    expect(screen.getByText(/CBBR Content/)).toBeVisible();
  });
});
