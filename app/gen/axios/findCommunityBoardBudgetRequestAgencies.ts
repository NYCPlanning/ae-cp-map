import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestAgenciesQueryResponse,
  FindCommunityBoardBudgetRequestAgenciesQueryParams,
} from "../types/FindCommunityBoardBudgetRequestAgencies";

/**
 * @summary Find community board budget request agencies
 * @link /community-board-budget-requests/agencies
 */
export async function findCommunityBoardBudgetRequestAgencies(
  params?: FindCommunityBoardBudgetRequestAgenciesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestAgenciesQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityBoardBudgetRequestAgenciesQueryResponse>({
      method: "get",
      url: `/community-board-budget-requests/agencies`,
      baseURL: "https://zoning.planningdigital.com/api",
      params,
      ...options,
    });
  return res.data;
}
