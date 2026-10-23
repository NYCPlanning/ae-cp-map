import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ProjectAmountMenu } from ".";

describe("ProjectAmountMenu", () => {
  it("should render project amount label", () => {
    render(
      <MemoryRouter>
        <ProjectAmountMenu
          commitmentsTotalMin={"1000"}
          commitmentsTotalMax={"2000"}
          onValidChange={() => {
            return;
          }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Project Amount")).toBeInTheDocument();
  });
});
