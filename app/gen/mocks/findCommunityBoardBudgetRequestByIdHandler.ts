import { http } from "msw";
import { createFindCommunityBoardBudgetRequestByIdQueryResponse } from "./createFindCommunityBoardBudgetRequestById";

export const findCommunityBoardBudgetRequestByIdHandler = http.get(
  "*/community-board-budget-requests/:cbbrId",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCommunityBoardBudgetRequestByIdQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
