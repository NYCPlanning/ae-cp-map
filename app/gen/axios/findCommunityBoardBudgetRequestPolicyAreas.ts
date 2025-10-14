import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestPolicyAreasQueryResponse,
  FindCommunityBoardBudgetRequestPolicyAreasQueryParams,
} from "../types/FindCommunityBoardBudgetRequestPolicyAreas";

/**
 * @summary Find community board budget request policy areas
 * @link /community-board-budget-requests/policy-areas
 */
export async function findCommunityBoardBudgetRequestPolicyAreas(
  params?: FindCommunityBoardBudgetRequestPolicyAreasQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestPolicyAreasQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityBoardBudgetRequestPolicyAreasQueryResponse>({
      method: "get",
      url: `/community-board-budget-requests/policy-areas`,
      baseURL: "https://zoning.planningdigital.com/api",
      params,
      ...options,
    });
  return res.data;
}
