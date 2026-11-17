import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { StreetscapeProvider } from "@nycplanning/streetscape";
import { RadiusDropdown } from "./RadiusDropdown";

function renderRadiusDropdown(initialEntry = "/?pin=40.7,-73.9") {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: (
          <div>
            <RadiusDropdown
              addressSearchSliderValue={400}
              setAddressSearchSliderValue={vi.fn()}
              clearRadiusFilter={vi.fn()}
            />
            <button type="button">Outside element</button>
          </div>
        ),
      },
    ],
    {
      initialEntries: [initialEntry],
    },
  );

  return render(
    <StreetscapeProvider>
      <RouterProvider router={router} />
    </StreetscapeProvider>,
  );
}

describe("RadiusDropdown", () => {
  it("renders disabled trigger button when pin is not set", () => {
    renderRadiusDropdown("/");
    const trigger = screen.getByRole("button", { name: /radius/i });
    expect(trigger).toBeDisabled();
  });

  it("renders enabled trigger button when pin is set", () => {
    renderRadiusDropdown();
    const trigger = screen.getByRole("button", { name: /radius/i });
    expect(trigger).toBeEnabled();
  });

  it("has accessible name, moves focus into modal when opened, and returns focus to trigger when closed with close button", async () => {
    const user = userEvent.setup();
    renderRadiusDropdown();

    const trigger = screen.getByRole("button", { name: /radius/i });
    await user.click(trigger);

    // Acceptance 2: Focus moves into modal when opened
    const closeBtn = screen.getByRole("button", { name: /close/i });
    await waitFor(() => {
      expect(document.activeElement).toBe(closeBtn);
    });

    // Acceptance 1: Accessible name
    const dialog = screen.getByRole("dialog", { name: /filter results/i });
    expect(dialog).toBeInTheDocument();

    // Acceptance 4: Returns focus to its trigger when closed
    await user.click(closeBtn);
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it("returns focus to trigger when closed with Escape key", async () => {
    const user = userEvent.setup();
    renderRadiusDropdown();

    const trigger = screen.getByRole("button", { name: /radius/i });
    await user.click(trigger);

    const closeBtn = screen.getByRole("button", { name: /close/i });
    await waitFor(() => {
      expect(document.activeElement).toBe(closeBtn);
    });

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it("returns focus to trigger when closed with Clear Filter button", async () => {
    const user = userEvent.setup();
    renderRadiusDropdown();

    const trigger = screen.getByRole("button", { name: /radius/i });
    await user.click(trigger);

    const closeBtn = screen.getByRole("button", { name: /close/i });
    await waitFor(() => {
      expect(document.activeElement).toBe(closeBtn);
    });

    const clearFilterBtn = screen.getByRole("button", {
      name: /clear filter/i,
    });
    await user.click(clearFilterBtn);
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it("keeps focus trapped within the modal while open", async () => {
    const user = userEvent.setup();
    renderRadiusDropdown();

    const trigger = screen.getByRole("button", { name: /radius/i });
    await user.click(trigger);

    const closeBtn = screen.getByRole("button", { name: /close/i });
    await waitFor(() => {
      expect(document.activeElement).toBe(closeBtn);
    });

    const dialog = screen.getByRole("dialog", { name: /filter results/i });

    // Tab through interactive elements in the dialog
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);

    // Tabbing again wraps around inside the dialog
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});
