import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindCityCouncilDistrictsQueryResponse } from "../types/FindCityCouncilDistricts";

/**
 * @summary Find city council districts
 * @link /city-council-districts
 */
export async function findCityCouncilDistricts(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindCityCouncilDistrictsQueryResponse>["data"]> {
  const res = await client<FindCityCouncilDistrictsQueryResponse>({
    method: "get",
    url: `/city-council-districts`,
    ...options,
  });
  return res.data;
}
