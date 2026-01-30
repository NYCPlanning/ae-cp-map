import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdQueryResponse,
  FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams,
} from "../types/FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId";

/**
 * @summary Mapbox Vector Tiles for community board budget requests from a community district
 * @link /boroughs/:boroughId/community-districts/:communityDistrictId/community-board-budget-requests/:z/:x/:y.pbf
 */
export async function findCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId(
  boroughId: FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams["boroughId"],
  communityDistrictId: FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams["communityDistrictId"],
  z: FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams["z"],
  x: FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams["x"],
  y: FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams["y"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdQueryResponse>(
      {
        method: "get",
        url: `/boroughs/${boroughId}/community-districts/${communityDistrictId}/community-board-budget-requests/${z}/${x}/${y}.pbf`,
        baseURL: "https://zoning.planningdigital.com/api",
        ...options,
      },
    );
  return res.data;
}
