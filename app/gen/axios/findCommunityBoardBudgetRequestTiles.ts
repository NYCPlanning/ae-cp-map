import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityBoardBudgetRequestTilesQueryResponse,
  FindCommunityBoardBudgetRequestTilesPathParams,
} from "../types/FindCommunityBoardBudgetRequestTiles";

/**
 * @summary Mapbox Vector Tiles for community board budget requests
 * @link /community-board-budget-requests/:z/:x/:y.pbf
 */
export async function findCommunityBoardBudgetRequestTiles(
  z: FindCommunityBoardBudgetRequestTilesPathParams["z"],
  x: FindCommunityBoardBudgetRequestTilesPathParams["x"],
  y: FindCommunityBoardBudgetRequestTilesPathParams["y"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityBoardBudgetRequestTilesQueryResponse>["data"]
> {
  const res = await client<FindCommunityBoardBudgetRequestTilesQueryResponse>({
    method: "get",
    url: `/community-board-budget-requests/${z}/${x}/${y}.pbf`,
    baseURL: "https://zoning.planningdigital.com/api",
    ...options,
  });
  return res.data;
}
