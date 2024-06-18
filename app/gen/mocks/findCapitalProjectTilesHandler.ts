import { http } from "msw";
import { createFindCapitalProjectTilesQueryResponse } from "./createFindCapitalProjectTiles";

export const findCapitalProjectTilesHandler = http.get(
  "*/capital-projects/:z/:x/:y.pbf",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCapitalProjectTilesQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
