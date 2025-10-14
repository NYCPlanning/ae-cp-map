import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestsQueryResponse,
  FindCommunityBoardBudgetRequestsQueryParams,
} from "../types/FindCommunityBoardBudgetRequests";

/**
 * @summary Find paginated budget requests
 * @link /community-board-budget-requests
 */
export async function findCommunityBoardBudgetRequests(
  params?: FindCommunityBoardBudgetRequestsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestsQueryResponse>["data"]
> {
  const res = await client<FindCommunityBoardBudgetRequestsQueryResponse>({
    method: "get",
    url: `/community-board-budget-requests`,
    baseURL: "https://zoning.planningdigital.com/api",
    params,
    ...options,
  });
  return res.data;
}
