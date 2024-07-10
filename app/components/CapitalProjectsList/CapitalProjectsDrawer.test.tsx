import { render, screen } from "@testing-library/react";
import { Agency, CapitalProject, createCapitalProjectPage } from "~/gen";
import { CapitalProjectsDrawer } from "./CapitalProjectsDrawer";
import { BrowserRouter } from "react-router-dom";

describe("CapitalProjectsDrawer", () => {
  let capitalProjects: CapitalProject[];
  let agencies: Agency[];

  beforeAll(() => {
    agencies = [
      { initials: "DDC", name: "Department of Design and Construction" },
      { initials: "DEP", name: "Department of Environmental Protection" },
    ];
    capitalProjects = createCapitalProjectPage().capitalProjects;
  });

  it("should render a Drawer with bar to expand project list panel", () => {
    render(
      // need to wrap in browser component to avoid https://github.com/remix-run/react-router/issues/9187
      <BrowserRouter>
        <CapitalProjectsDrawer
          capitalProjects={capitalProjects}
          district={"City Council District 23"}
          agencies={agencies}
        >
          <></>
        </CapitalProjectsDrawer>
      </BrowserRouter>,
    );
    expect(
      screen.getByLabelText("Expand project list panel"),
    ).toBeInTheDocument();
  });
});
