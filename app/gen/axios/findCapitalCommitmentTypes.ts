import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindCapitalCommitmentTypesQueryResponse } from "../types/FindCapitalCommitmentTypes";

/**
 * @summary Capital Commitment Types
 * @link /capital-commitment-types
 */
export async function findCapitalCommitmentTypes(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindCapitalCommitmentTypesQueryResponse>["data"]> {
  const res = await client<FindCapitalCommitmentTypesQueryResponse>({
    method: "get",
    url: `/capital-commitment-types`,
    ...options,
  });
  return res.data;
}
