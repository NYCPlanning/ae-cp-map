import { render, screen } from "@testing-library/react";
import { ProjectAmountMenu } from ".";

describe("ProjectAmountMenu", () => {
  it("should render project amount label", () => {
    render(
      <ProjectAmountMenu
        commitmentsTotalMin={"1000"}
        commitmentsTotalMax={"2000"}
        onValidChange={() => {
          return;
        }}
      />,
    );
    expect(screen.getByText("Project Amount")).toBeInTheDocument();
  });
});
