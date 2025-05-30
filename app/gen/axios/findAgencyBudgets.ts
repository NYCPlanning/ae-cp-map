import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindAgencyBudgetsQueryResponse } from "../types/FindAgencyBudgets";

/**
 * @summary Find agency budgets
 * @link /agency-budgets
 */
export async function findAgencyBudgets(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindAgencyBudgetsQueryResponse>["data"]> {
  const res = await client<FindAgencyBudgetsQueryResponse>({
    method: "get",
    url: `/agency-budgets`,
    baseURL: "https://zoning.planningdigital.com/api",
    ...options,
  });
  return res.data;
}
