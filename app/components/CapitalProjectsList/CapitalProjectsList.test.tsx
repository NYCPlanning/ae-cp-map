import { createAgency, createCapitalProject } from "~/gen/mocks";
import { Agency, CapitalProject } from "~/gen/types";
import { CapitalProjectsList } from "./CapitalProjectsList";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";

describe("CapitalProjectsList", () => {
  let capitalProjects: CapitalProject[];
  let agencies: Agency[];

  beforeAll(() => {
    agencies = Array.from(
      [
        { initials: "DDC", name: "Department of Design and Construction" },
        { initials: "DEP", name: "Department of Environmental Protection" },
      ],
      (agency) => createAgency(agency),
    );
    capitalProjects = Array.from(
      [
        {
          managingCode: "080",
          id: "foo",
          managingAgency: agencies[0].initials,
        },
        {
          managingCode: "100",
          id: "bar",
          managingAgency: agencies[1].initials,
        },
      ],
      (project) => createCapitalProject(project),
    );
  });

  it("should render list title", () => {
    render(
      <BrowserRouter>
        <CapitalProjectsList
          capitalProjects={[]}
          agencies={agencies}
          capitalProjectsTotal={2}
          isExpanded={false}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Mapped Capital Projects/)).toBeInTheDocument();
  });
  it("should render each project in a CapitalProjectsListItem", () => {
    render(
      <BrowserRouter>
        <CapitalProjectsList
          capitalProjects={capitalProjects}
          agencies={agencies}
          capitalProjectsTotal={2}
          isExpanded={false}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Design and Construction/)).toBeInTheDocument();
    expect(screen.getByText(/Environmental Protection/)).toBeInTheDocument();
  });

  it("should render notice when there are no capital projects", () => {
    render(
      <BrowserRouter>
        <CapitalProjectsList
          capitalProjects={[]}
          agencies={agencies}
          capitalProjectsTotal={0}
          isExpanded={false}
        />
      </BrowserRouter>,
    );
    expect(screen.getByText(/No available results/)).toBeInTheDocument();
  });
});
