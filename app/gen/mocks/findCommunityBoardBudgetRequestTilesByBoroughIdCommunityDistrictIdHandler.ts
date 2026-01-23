import { http } from "msw";
import { createFindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdQueryResponse } from "./createFindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId";

export const findCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdHandler =
  http.get(
    "*/boroughs/:boroughId/community-districts/:communityDistrictId/community-board-budget-requests/:z/:x/:y.pbf",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
