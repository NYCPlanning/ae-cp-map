import { http } from "msw";
import { createFindCommunityBoardBudgetRequestAgencyCategoryResponsesQueryResponse } from "./createFindCommunityBoardBudgetRequestAgencyCategoryResponses";

export const findCommunityBoardBudgetRequestAgencyCategoryResponsesHandler =
  http.get(
    "*/community-board-budget-requests/agency-category-responses",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCommunityBoardBudgetRequestAgencyCategoryResponsesQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
