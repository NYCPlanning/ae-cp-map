import { http } from "msw";
import { createFindCapitalProjectTilesByCityCouncilDistrictIdQueryResponse } from "./createFindCapitalProjectTilesByCityCouncilDistrictId";

export const findCapitalProjectTilesByCityCouncilDistrictIdHandler = http.get(
  "*/city-council-districts/:cityCouncilDistrictId/capital-projects/:z/:x/:y.pbf",
  function handler(info) {
    return new Response(
      JSON.stringify(
        createFindCapitalProjectTilesByCityCouncilDistrictIdQueryResponse(),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
