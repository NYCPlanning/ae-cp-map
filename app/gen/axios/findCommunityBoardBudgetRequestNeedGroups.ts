import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestNeedGroupsQueryResponse,
  FindCommunityBoardBudgetRequestNeedGroupsQueryParams,
} from "../types/FindCommunityBoardBudgetRequestNeedGroups";

/**
 * @summary Find community board budget request need groups
 * @link /community-board-budget-requests/need-groups
 */
export async function findCommunityBoardBudgetRequestNeedGroups(
  params?: FindCommunityBoardBudgetRequestNeedGroupsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestNeedGroupsQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityBoardBudgetRequestNeedGroupsQueryResponse>({
      method: "get",
      url: `/community-board-budget-requests/need-groups`,
      baseURL: "https://zoning.planningdigital.com/api",
      params,
      ...options,
    });
  return res.data;
}
