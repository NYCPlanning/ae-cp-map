import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import { ContentPanelAccordion } from ".";

function ContentPanelAccordionTestRoute() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return <Outlet context={{ isPanelOpen, setIsPanelOpen }} />;
}

function renderAccordion() {
  return render(
    <MemoryRouter>
      <Routes>
        <Route element={<ContentPanelAccordionTestRoute />}>
          <Route
            index
            element={
              <ContentPanelAccordion accordionHeading="CBBR Title">
                CBBR Content
              </ContentPanelAccordion>
            }
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("CommunityBoardBudgetRequestPanel", () => {
  it("should render the accordion panel with the given title", () => {
    renderAccordion();

    expect(screen.getByText(/CBBR Title/)).toBeVisible();
  });

  it("should render the accordion panel in the closed state", () => {
    renderAccordion();

    expect(screen.getByText(/CBBR Content/)).not.toBeVisible();
  });

  it("should open the accordion panel when the title is clicked", async () => {
    renderAccordion();

    await userEvent.click(screen.getByText(/CBBR Title/));
    await waitFor(() => {
      expect(screen.getByText(/CBBR Content/)).toBeVisible();
    });
  });
});
