import { render, screen } from "@testing-library/react";
import { HeaderBar } from "./index";

describe("ClearFilterBtn", () => {
  it("renders with site name text", () => {
    render(<HeaderBar />);
    expect(screen.getByText("Capital Projects Portal")).toBeInTheDocument();
  });
});
