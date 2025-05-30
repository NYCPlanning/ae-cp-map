import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryParams,
} from "../types/FindCapitalProjectsByBoroughIdCommunityDistrictId";

/**
 * @summary Find paginated capital projects within a specified community district
 * @link /boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects
 */
export async function findCapitalProjectsByBoroughIdCommunityDistrictId(
  boroughId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["boroughId"],
  communityDistrictId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["communityDistrictId"],
  params?: FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse>(
      {
        method: "get",
        url: `/boroughs/${boroughId}/community-districts/${communityDistrictId}/capital-projects`,
        baseURL: "https://zoning.planningdigital.com/api",
        params,
        ...options,
      },
    );
  return res.data;
}
