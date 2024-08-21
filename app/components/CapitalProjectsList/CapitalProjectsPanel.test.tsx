import { render, screen } from "@testing-library/react";
import { CapitalProjectsPanel } from "./CapitalProjectsPanel";

describe("CapitalProjectsPanel", () => {
  it("should contain a project list", () => {
    render(
      <CapitalProjectsPanel
        capitalProjects={[]}
        agencies={[]}
        district="Community District"
      >
        <></>
      </CapitalProjectsPanel>,
    );
    expect(screen.getByText(/Mapped Capital Projects/)).toBeVisible();
  });
});
