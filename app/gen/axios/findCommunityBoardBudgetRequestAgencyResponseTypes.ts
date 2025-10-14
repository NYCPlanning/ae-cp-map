import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindCommunityBoardBudgetRequestAgencyResponseTypesQueryResponse } from "../types/FindCommunityBoardBudgetRequestAgencyResponseTypes";

/**
 * @summary Find community board budget request agency reponse types
 * @link /community-board-budget-requests/agency-response-types
 */
export async function findCommunityBoardBudgetRequestAgencyResponseTypes(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestAgencyResponseTypesQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityBoardBudgetRequestAgencyResponseTypesQueryResponse>(
      {
        method: "get",
        url: `/community-board-budget-requests/agency-response-types`,
        baseURL: "https://zoning.planningdigital.com/api",
        ...options,
      },
    );
  return res.data;
}
