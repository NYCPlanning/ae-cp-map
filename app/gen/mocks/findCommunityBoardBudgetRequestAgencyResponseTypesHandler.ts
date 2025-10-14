import { http } from "msw";
import { createFindCommunityBoardBudgetRequestAgencyResponseTypesQueryResponse } from "./createFindCommunityBoardBudgetRequestAgencyResponseTypes";

export const findCommunityBoardBudgetRequestAgencyResponseTypesHandler =
  http.get(
    "*/community-board-budget-requests/agency-response-types",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCommunityBoardBudgetRequestAgencyResponseTypesQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
