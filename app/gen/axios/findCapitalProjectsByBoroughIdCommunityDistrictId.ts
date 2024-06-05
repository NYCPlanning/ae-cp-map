import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams,
} from "../types/FindCapitalProjectsByBoroughIdCommunityDistrictId";

/**
 * @summary 🚧 Find paginated capital projects within a specified community district
 * @link /boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects
 */
export async function findCapitalProjectsByBoroughIdCommunityDistrictId(
  boroughId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["boroughId"],
  communityDistrictId: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams["communityDistrictId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse>(
      {
        method: "get",
        url: `/boroughs/${boroughId}/community-districts/${communityDistrictId}/capital-projects`,
        ...options,
      },
    );
  return res.data;
}
