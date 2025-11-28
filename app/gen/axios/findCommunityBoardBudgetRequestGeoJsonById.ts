import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestGeoJsonByIdQueryResponse,
  FindCommunityBoardBudgetRequestGeoJsonByIdPathParams,
} from "../types/FindCommunityBoardBudgetRequestGeoJsonById";

/**
 * @summary Find details about a specific budget request as a geojson feature
 * @link /community-board-budget-requests/:cbbrId/geojson
 */
export async function findCommunityBoardBudgetRequestGeoJsonById(
  cbbrId: FindCommunityBoardBudgetRequestGeoJsonByIdPathParams["cbbrId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestGeoJsonByIdQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityBoardBudgetRequestGeoJsonByIdQueryResponse>({
      method: "get",
      url: `/community-board-budget-requests/${cbbrId}/geojson`,
      baseURL: "https://zoning.planningdigital.com/api",
      ...options,
    });
  return res.data;
}
