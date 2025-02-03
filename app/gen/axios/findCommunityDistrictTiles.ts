import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityDistrictTilesQueryResponse,
  FindCommunityDistrictTilesPathParams,
} from "../types/FindCommunityDistrictTiles";

/**
 * @summary Mapbox Vector Tiles for community districts
 * @link /community-districts/:z/:x/:y.pbf
 */
export async function findCommunityDistrictTiles(
  z: FindCommunityDistrictTilesPathParams["z"],
  x: FindCommunityDistrictTilesPathParams["x"],
  y: FindCommunityDistrictTilesPathParams["y"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindCommunityDistrictTilesQueryResponse>["data"]> {
  const res = await client<FindCommunityDistrictTilesQueryResponse>({
    method: "get",
    url: `/community-districts/${z}/${x}/${y}.pbf`,
    baseURL: "https://zoning.planningdigital.com/api",
    ...options,
  });
  return res.data;
}
