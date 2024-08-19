import { http } from "msw";
import { createFindCapitalProjectTilesByBoroughIdCommunityDistrictIdQueryResponse } from "./createFindCapitalProjectTilesByBoroughIdCommunityDistrictId";

export const findCapitalProjectTilesByBoroughIdCommunityDistrictIdHandler =
  http.get(
    "*/boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects/:z/:x/:y.pbf",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCapitalProjectTilesByBoroughIdCommunityDistrictIdQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
