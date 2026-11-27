import { render, screen } from "@testing-library/react";
import { WelcomeContent } from "./WelcomeContent";

describe("WelcomeContent", () => {
  it("should have a database section", () => {
    render(<WelcomeContent />);

    expect(
      screen.getAllByText(/Learn how New York City invests/)[0],
    ).toBeVisible();
    expect(screen.getByText(/The Capital Projects Portal/)).toBeVisible();
  });

  it("should describe the supporting housing growth layers", () => {
    render(<WelcomeContent />);

    expect(
      screen.getByText(/supporting layers related to housing growth/),
    ).toBeVisible();
  });
});
