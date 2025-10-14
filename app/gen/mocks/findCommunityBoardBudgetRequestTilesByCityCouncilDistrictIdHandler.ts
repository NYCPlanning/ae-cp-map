import { http } from "msw";
import { createFindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdQueryResponse } from "./createFindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId";

export const findCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdHandler =
  http.get(
    "*/city-council-districts/:cityCouncilDistrictId/community-board-budget-requests/:z/:x/:y.pbf",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
