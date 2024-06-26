import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectsByCityCouncilIdQueryResponse,
  FindCapitalProjectsByCityCouncilIdPathParams,
  FindCapitalProjectsByCityCouncilIdQueryParams,
} from "../types/FindCapitalProjectsByCityCouncilId";

/**
 * @summary Find paginated capital projects within a specific city council district.
 * @link /city-council-districts/:cityCouncilDistrictId/capital-projects
 */
export async function findCapitalProjectsByCityCouncilId(
  cityCouncilDistrictId: FindCapitalProjectsByCityCouncilIdPathParams["cityCouncilDistrictId"],
  params?: FindCapitalProjectsByCityCouncilIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalProjectsByCityCouncilIdQueryResponse>["data"]
> {
  const res = await client<FindCapitalProjectsByCityCouncilIdQueryResponse>({
    method: "get",
    url: `/city-council-districts/${cityCouncilDistrictId}/capital-projects`,
    params,
    ...options,
  });
  return res.data;
}
