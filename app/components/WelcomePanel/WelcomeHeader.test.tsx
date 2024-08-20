import { render, screen } from "@testing-library/react";
import { WelcomeHeader } from "./WelcomeHeader";

describe("WelcomeHeader", () => {
  it("should have a heading", () => {
    render(<WelcomeHeader />);
    expect(screen.getByText(/Capital Projects Portal/)).toBeVisible();
  });
});
