import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindAgenciesQueryResponse } from "../types/FindAgencies";

/**
 * @summary Find agencies
 * @link /agencies
 */
export async function findAgencies(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindAgenciesQueryResponse>["data"]> {
  const res = await client<FindAgenciesQueryResponse>({
    method: "get",
    url: `/agencies`,
    ...options,
  });
  return res.data;
}
