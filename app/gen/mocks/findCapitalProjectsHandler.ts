import { http } from "msw";
import { createFindCapitalProjectsQueryResponse } from "./createFindCapitalProjects";

export const findCapitalProjectsHandler = http.get(
  "*/capital-projects",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCapitalProjectsQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
