import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { BrowserRouter } from "react-router-dom";

describe("Pagination", () => {
  it("should render stack with chevron icons", () => {
    render(
      // need to wrap in browser component to avoid https://github.com/remix-run/react-router/issues/9187
      <BrowserRouter>
        <Pagination total={7} />
      </BrowserRouter>,
    );
    expect(screen.getByLabelText("left")).toBeInTheDocument();
    expect(screen.getByLabelText("right")).toBeInTheDocument();
  });
});
