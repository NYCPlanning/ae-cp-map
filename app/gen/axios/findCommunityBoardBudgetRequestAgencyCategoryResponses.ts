import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindCommunityBoardBudgetRequestAgencyCategoryResponsesQueryResponse } from "../types/FindCommunityBoardBudgetRequestAgencyCategoryResponses";

/**
 * @summary Find community board budget request agency reponse categories
 * @link /community-board-budget-requests/agency-category-responses
 */
export async function findCommunityBoardBudgetRequestAgencyCategoryResponses(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestAgencyCategoryResponsesQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityBoardBudgetRequestAgencyCategoryResponsesQueryResponse>(
      {
        method: "get",
        url: `/community-board-budget-requests/agency-category-responses`,
        baseURL: "https://zoning.planningdigital.com/api",
        ...options,
      },
    );
  return res.data;
}
