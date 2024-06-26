import { http } from "msw";
import { createFindCityCouncilDistrictTilesQueryResponse } from "./createFindCityCouncilDistrictTiles";

export const findCityCouncilDistrictTilesHandler = http.get(
  "*/city-council-districts/:z/:x/:y.pbf",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCityCouncilDistrictTilesQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
