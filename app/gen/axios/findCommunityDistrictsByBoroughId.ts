import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCommunityDistrictsByBoroughIdQueryResponse,
  FindCommunityDistrictsByBoroughIdPathParams,
} from "../types/FindCommunityDistrictsByBoroughId";

/**
 * @summary Find community districts within a borough
 * @link /boroughs/:boroughId/community-districts
 */
export async function findCommunityDistrictsByBoroughId(
  boroughId: FindCommunityDistrictsByBoroughIdPathParams["boroughId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCommunityDistrictsByBoroughIdQueryResponse>["data"]
> {
  const res = await client<FindCommunityDistrictsByBoroughIdQueryResponse>({
    method: "get",
    url: `/boroughs/${boroughId}/community-districts`,
    ...options,
  });
  return res.data;
}
