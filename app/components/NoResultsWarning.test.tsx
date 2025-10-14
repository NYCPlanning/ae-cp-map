import { render, screen } from "@testing-library/react";
import { NoResultsWarning } from "./NoResultsWarning";

describe("NoResultsWarning", () => {
  it("should render with warning", () => {
    render(<NoResultsWarning />);
    expect(screen.getByText(/No results/)).toBeInTheDocument();
    expect(
      screen.getByText(/No available results with current filters applied./),
    ).toBeInTheDocument();
  });
});
