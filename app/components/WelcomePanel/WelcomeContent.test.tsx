import { render, screen } from "@testing-library/react";
import { WelcomeContent } from "./WelcomeContent";

describe("WelcomeContent", () => {
  it("should have a database section", () => {
    render(<WelcomeContent />);

    expect(screen.getAllByText(/Capital Projects Database/)[0]).toBeVisible();
    expect(screen.getByText(/ongoing capital projects/)).toBeVisible();
  });

  it("should have a how to section", () => {
    render(<WelcomeContent />);

    expect(screen.getByText(/How to Use/)).toBeVisible();
    expect(screen.getByText(/Select a project/)).toBeVisible();
  });

  it("should have a more information section with links", () => {
    render(<WelcomeContent />);

    expect(screen.getByText(/More information/)).toBeVisible();
    expect(screen.getByText(/To learn more/)).toBeVisible();

    expect(
      screen.getByRole("link", {
        name: "The Mayor's Office of Management and Budget",
      }),
    ).toHaveAttribute(
      "href",
      "https://www.nyc.gov/site/omb/publications/publications.page",
    );
    expect(
      screen.getByRole("link", { name: "Bytes of the Big Apple" }),
    ).toHaveAttribute(
      "href",
      "https://www.nyc.gov/content/planning/pages/resources/datasets/capital-projects-database",
    );
  });
});
