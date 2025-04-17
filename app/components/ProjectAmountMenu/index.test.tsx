import { render, screen } from "@testing-library/react";
import { ProjectAmountMenu } from ".";

describe("ProjectAmountMenu", () => {
  it("should render project amount label", () => {
    render(
      <ProjectAmountMenu
        showClearButton={false}
        onProjectAmountMenuClear={() => null}
      >
        Child Menus
      </ProjectAmountMenu>,
    );
    expect(screen.getByText("Project Amount")).toBeInTheDocument();
  });
});
