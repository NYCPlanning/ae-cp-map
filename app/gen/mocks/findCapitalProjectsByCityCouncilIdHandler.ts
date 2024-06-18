import { http } from "msw";
import { createFindCapitalProjectsByCityCouncilIdQueryResponse } from "./createFindCapitalProjectsByCityCouncilId";

export const findCapitalProjectsByCityCouncilIdHandler = http.get(
  "*/city-council-districts/:cityCouncilDistrictId/capital-projects",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCapitalProjectsByCityCouncilIdQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
