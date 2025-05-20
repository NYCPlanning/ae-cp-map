import { render, screen } from "@testing-library/react";
import { Agency, CapitalProject, createCapitalProjectPage } from "~/gen";
import { CapitalProjectsAccordionPanel } from "./CapitalProjectsAccordionPanel";
import { BrowserRouter } from "react-router-dom";

describe("CapitalProjectsAccordionPanel", () => {
  let capitalProjects: CapitalProject[];
  let agencies: Agency[];

  beforeAll(() => {
    agencies = [
      { initials: "DDC", name: "Department of Design and Construction" },
      { initials: "DEP", name: "Department of Environmental Protection" },
    ];
    capitalProjects = createCapitalProjectPage().capitalProjects;
  });

  it("should render an Accordion with chevron to collapse project list panel", () => {
    render(
      // need to wrap in browser component to avoid https://github.com/remix-run/react-router/issues/9187
      <BrowserRouter>
        <CapitalProjectsAccordionPanel
          capitalProjects={capitalProjects}
          capitalProjectsTotal={2}
          agencies={agencies}
        >
          <></>
        </CapitalProjectsAccordionPanel>
      </BrowserRouter>,
    );
    expect(
      screen.getByLabelText("Toggle project list panel"),
    ).toBeInTheDocument();
  });
});
