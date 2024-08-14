import { createCapitalProjectPage } from "~/gen/mocks";
import { Agency, CapitalProject } from "~/gen/types";
import { CapitalProjectsList } from "./CapitalProjectsList";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("CapitalProjectsList", () => {
  let capitalProjects: CapitalProject[];
  let agencies: Agency[];

  beforeAll(() => {
    agencies = [
      { initials: "DDC", name: "Department of Design and Construction" },
      { initials: "DEP", name: "Department of Environmental Protection" },
    ];
    capitalProjects = createCapitalProjectPage().capitalProjects;
  });

  it("should render each project in a CapitalProjectsListItem", () => {
    render(
      <BrowserRouter>
        <CapitalProjectsList
          capitalProjects={capitalProjects}
          agencies={agencies}
        />
      </BrowserRouter>,
    );
    expect(screen.getByRole("link")).toBeInTheDocument(); // uhhh
  });
});
