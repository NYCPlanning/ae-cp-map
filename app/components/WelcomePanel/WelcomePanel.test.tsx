import { render, screen } from "@testing-library/react";
import { WelcomePanel } from "./WelcomePanel";

describe("WelcomePanel", () => {
  it("should contain a welcome heading", () => {
    render(<WelcomePanel />);

    expect(screen.getByText(/Capital Projects Portal/)).toBeVisible();
  });

  it("should contain welcome content", () => {
    render(<WelcomePanel />);

    expect(screen.getAllByText(/Capital Projects Database/)[0]).toBeVisible();
    expect(screen.getByText(/ongoing capital projects/)).toBeVisible();
  });
});
