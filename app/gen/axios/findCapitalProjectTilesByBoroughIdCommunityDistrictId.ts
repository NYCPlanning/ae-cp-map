import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectTilesByBoroughIdCommunityDistrictIdQueryResponse,
  FindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams,
} from "../types/FindCapitalProjectTilesByBoroughIdCommunityDistrictId";

/**
 * @summary Mapbox Vector Tiles for capital projects intersecting a community district
 * @link /boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects/:z/:x/:y.pbf
 */
export async function findCapitalProjectTilesByBoroughIdCommunityDistrictId(
  boroughId: FindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams["boroughId"],
  communityDistrictId: FindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams["communityDistrictId"],
  z: FindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams["z"],
  x: FindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams["x"],
  y: FindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams["y"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalProjectTilesByBoroughIdCommunityDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindCapitalProjectTilesByBoroughIdCommunityDistrictIdQueryResponse>(
      {
        method: "get",
        url: `/boroughs/${boroughId}/community-districts/${communityDistrictId}/capital-projects/${z}/${x}/${y}.pbf`,
        baseURL: "https://zoning.planningdigital.com/api",
        ...options,
      },
    );
  return res.data;
}
