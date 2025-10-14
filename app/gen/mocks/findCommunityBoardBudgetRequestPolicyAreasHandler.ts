import { http } from "msw";
import { createFindCommunityBoardBudgetRequestPolicyAreasQueryResponse } from "./createFindCommunityBoardBudgetRequestPolicyAreas";

export const findCommunityBoardBudgetRequestPolicyAreasHandler = http.get(
  "*/community-board-budget-requests/policy-areas",
  function handler(info) {
    return new Response(
      JSON.stringify(
        createFindCommunityBoardBudgetRequestPolicyAreasQueryResponse(),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
