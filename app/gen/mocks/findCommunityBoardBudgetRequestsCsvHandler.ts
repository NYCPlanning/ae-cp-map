import { http } from "msw";
import { createFindCommunityBoardBudgetRequestsCsvQueryResponse } from "./createFindCommunityBoardBudgetRequestsCsv";

export const findCommunityBoardBudgetRequestsCsvHandler = http.get(
  "*/community-board-budget-requests/csv",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCommunityBoardBudgetRequestsCsvQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
