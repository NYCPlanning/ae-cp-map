import { render, screen } from "@testing-library/react";
import { HeaderBar } from "./index";
import { BrowserRouter } from "react-router";

describe("Header Bar", () => {
  it("renders with site name text", () => {
    render(
      <BrowserRouter>
        <HeaderBar />
      </BrowserRouter>,
    );
    expect(screen.getByText("Capital Projects Portal")).toBeInTheDocument();
  });
});
