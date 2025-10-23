import { http } from "msw";
import { createFindCapitalProjectManagingAgenciesQueryResponse } from "./createFindCapitalProjectManagingAgencies";

export const findCapitalProjectManagingAgenciesHandler = http.get(
  "*/capital-projects/managing-agencies",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCapitalProjectManagingAgenciesQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
