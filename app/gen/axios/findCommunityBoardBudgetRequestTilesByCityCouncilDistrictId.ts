import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdQueryResponse,
  FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdPathParams,
} from "../types/FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId";

/**
 * @summary Mapbox Vector Tiles for community board budget requests intersecting a city council district
 * @link /city-council-districts/:cityCouncilDistrictId/community-board-budget-requests/:z/:x/:y.pbf
 */
export async function findCommunityBoardBudgetRequestTilesByCityCouncilDistrictId(
  cityCouncilDistrictId: FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdPathParams["cityCouncilDistrictId"],
  z: FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdPathParams["z"],
  x: FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdPathParams["x"],
  y: FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdPathParams["y"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdQueryResponse>(
      {
        method: "get",
        url: `/city-council-districts/${cityCouncilDistrictId}/community-board-budget-requests/${z}/${x}/${y}.pbf`,
        baseURL: "https://zoning.planningdigital.com/api",
        ...options,
      },
    );
  return res.data;
}
