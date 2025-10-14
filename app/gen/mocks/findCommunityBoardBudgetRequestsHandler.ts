import { http } from "msw";
import { createFindCommunityBoardBudgetRequestsQueryResponse } from "./createFindCommunityBoardBudgetRequests";

export const findCommunityBoardBudgetRequestsHandler = http.get(
  "*/community-board-budget-requests",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCommunityBoardBudgetRequestsQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
