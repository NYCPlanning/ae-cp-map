import { http } from "msw";
import { createFindCommunityBoardBudgetRequestAgenciesQueryResponse } from "./createFindCommunityBoardBudgetRequestAgencies";

export const findCommunityBoardBudgetRequestAgenciesHandler = http.get(
  "*/community-board-budget-requests/agencies",
  function handler(info) {
    return new Response(
      JSON.stringify(
        createFindCommunityBoardBudgetRequestAgenciesQueryResponse(),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
