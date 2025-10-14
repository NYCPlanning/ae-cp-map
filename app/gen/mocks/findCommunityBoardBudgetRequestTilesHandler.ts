import { http } from "msw";
import { createFindCommunityBoardBudgetRequestTilesQueryResponse } from "./createFindCommunityBoardBudgetRequestTiles";

export const findCommunityBoardBudgetRequestTilesHandler = http.get(
  "*/community-board-budget-requests/:z/:x/:y.pbf",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCommunityBoardBudgetRequestTilesQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
