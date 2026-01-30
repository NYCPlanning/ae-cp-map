import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestsCsvQueryResponse,
  FindCommunityBoardBudgetRequestsCsvQueryParams,
} from "../types/FindCommunityBoardBudgetRequestsCsv";

/**
 * @summary Download a CSV of budget reqeusts with the selected filters
 * @link /community-board-budget-requests/csv
 */
export async function findCommunityBoardBudgetRequestsCsv(
  params?: FindCommunityBoardBudgetRequestsCsvQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestsCsvQueryResponse>["data"]
> {
  const res = await client<FindCommunityBoardBudgetRequestsCsvQueryResponse>({
    method: "get",
    url: `/community-board-budget-requests/csv`,
    baseURL: "https://zoning.planningdigital.com/api",
    params,
    ...options,
  });
  return res.data;
}
