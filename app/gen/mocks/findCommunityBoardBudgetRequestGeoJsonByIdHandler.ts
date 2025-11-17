import { http } from "msw";
import { createFindCommunityBoardBudgetRequestGeoJsonByIdQueryResponse } from "./createFindCommunityBoardBudgetRequestGeoJsonById";

export const findCommunityBoardBudgetRequestGeoJsonByIdHandler = http.get(
  "*/community-board-budget-requests/:cbbrId/geojson",
  function handler(info) {
    return new Response(
      JSON.stringify(
        createFindCommunityBoardBudgetRequestGeoJsonByIdQueryResponse(),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
