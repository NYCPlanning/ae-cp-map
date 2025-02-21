import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectsQueryResponse,
  FindCapitalProjectsQueryParams,
} from "../types/FindCapitalProjects";

/**
 * @summary Find paginated capital projects.
 * @link /capital-projects
 */
export async function findCapitalProjects(
  params?: FindCapitalProjectsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindCapitalProjectsQueryResponse>["data"]> {
  const res = await client<FindCapitalProjectsQueryResponse>({
    method: "get",
    url: `/capital-projects`,
    baseURL: "https://zoning.planningdigital.com/api",
    params,
    ...options,
  });
  return res.data;
}
