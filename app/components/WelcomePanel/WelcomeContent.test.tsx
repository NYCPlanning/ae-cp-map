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

  it("should have a more information section with links", () => {
    render(<WelcomeContent />);

    expect(screen.getByText(/To learn more/)).toBeVisible();

    expect(
      screen.getByRole("link", {
        name: "capital planning overview",
      }),
    ).toHaveAttribute(
      "href",
      "https://www.nyc.gov/content/planning/pages/planning/capital-planning#overview",
    );
  });
});
