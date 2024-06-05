import { http } from "msw";
import { createFindCommunityDistrictTilesQueryResponse } from "./createFindCommunityDistrictTiles";

export const findCommunityDistrictTilesHandler = http.get(
  "*/community-districts/:z/:x/:y.pbf",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCommunityDistrictTilesQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
