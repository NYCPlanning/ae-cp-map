import { http } from "msw";
import { createFindCommunityBoardBudgetRequestNeedGroupsQueryResponse } from "./createFindCommunityBoardBudgetRequestNeedGroups";

export const findCommunityBoardBudgetRequestNeedGroupsHandler = http.get(
  "*/community-board-budget-requests/need-groups",
  function handler(info) {
    return new Response(
      JSON.stringify(
        createFindCommunityBoardBudgetRequestNeedGroupsQueryResponse(),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
