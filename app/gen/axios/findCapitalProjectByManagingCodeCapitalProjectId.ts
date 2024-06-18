import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectByManagingCodeCapitalProjectIdQueryResponse,
  FindCapitalProjectByManagingCodeCapitalProjectIdPathParams,
} from "../types/FindCapitalProjectByManagingCodeCapitalProjectId";

/**
 * @summary 🚧 Find details about a specific capital project
 * @link /capital-projects/:managingCode/:capitalProjectId
 */
export async function findCapitalProjectByManagingCodeCapitalProjectId(
  managingCode: FindCapitalProjectByManagingCodeCapitalProjectIdPathParams["managingCode"],
  capitalProjectId: FindCapitalProjectByManagingCodeCapitalProjectIdPathParams["capitalProjectId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalProjectByManagingCodeCapitalProjectIdQueryResponse>["data"]
> {
  const res =
    await client<FindCapitalProjectByManagingCodeCapitalProjectIdQueryResponse>(
      {
        method: "get",
        url: `/capital-projects/${managingCode}/${capitalProjectId}`,
        ...options,
      },
    );
  return res.data;
}
