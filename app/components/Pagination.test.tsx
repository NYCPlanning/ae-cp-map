import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { createRoutesStub } from "react-router";

describe("Pagination", () => {
  it("should render stack with chevron icons", () => {
    // create data router context,
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => (
          <Pagination
            label={"Capital Projects"}
            total={7}
            pageParamKey="cpPage"
          />
        ),
      },
    ]);

    render(<Stub initialEntries={["/"]} />);
    expect(screen.getByLabelText("left")).toBeInTheDocument();
    expect(screen.getByLabelText("right")).toBeInTheDocument();
  });
});
