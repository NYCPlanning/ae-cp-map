import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdQueryResponse,
  FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdPathParams,
} from "../types/FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId";

/**
 * @summary Find GeoJson for a specific community district
 * @link /boroughs/:boroughId/community-districts/:communityDistrictId/geojson
 */
export async function findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId(
  boroughId: FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdPathParams["boroughId"],
  communityDistrictId: FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdPathParams["communityDistrictId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdQueryResponse>(
      {
        method: "get",
        url: `/boroughs/${boroughId}/community-districts/${communityDistrictId}/geojson`,
        baseURL: "https://zoning.planningdigital.com/api",
        ...options,
      },
    );
  return res.data;
}
