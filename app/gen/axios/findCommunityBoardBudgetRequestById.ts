import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestByIdQueryResponse,
  FindCommunityBoardBudgetRequestByIdPathParams,
} from "../types/FindCommunityBoardBudgetRequestById";

/**
 * @summary Find details about a specific budget request
 * @link /community-board-budget-requests/:cbbrId
 */
export async function findCommunityBoardBudgetRequestById(
  cbbrId: FindCommunityBoardBudgetRequestByIdPathParams["cbbrId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestByIdQueryResponse>["data"]
> {
  const res = await client<FindCommunityBoardBudgetRequestByIdQueryResponse>({
    method: "get",
    url: `/community-board-budget-requests/${cbbrId}`,
    baseURL: "https://zoning.planningdigital.com/api",
    ...options,
  });
  return res.data;
}
