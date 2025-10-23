import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindCapitalProjectManagingAgenciesQueryResponse } from "../types/FindCapitalProjectManagingAgencies";

/**
 * @summary Find agencies that manage a capital project
 * @link /capital-projects/managing-agencies
 */
export async function findCapitalProjectManagingAgencies(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalProjectManagingAgenciesQueryResponse>["data"]
> {
  const res = await client<FindCapitalProjectManagingAgenciesQueryResponse>({
    method: "get",
    url: `/capital-projects/managing-agencies`,
    baseURL: "https://zoning.planningdigital.com/api",
    ...options,
  });
  return res.data;
}
