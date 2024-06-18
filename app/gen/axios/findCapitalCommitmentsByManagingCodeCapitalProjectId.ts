import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalCommitmentsByManagingCodeCapitalProjectIdQueryResponse,
  FindCapitalCommitmentsByManagingCodeCapitalProjectIdPathParams,
} from "../types/FindCapitalCommitmentsByManagingCodeCapitalProjectId";

/**
 * @summary 🚧 Find capital commitments associated with a specific capital project
 * @link /capital-projects/:managingCode/:capitalProjectId/capital-commitments
 */
export async function findCapitalCommitmentsByManagingCodeCapitalProjectId(
  managingCode: FindCapitalCommitmentsByManagingCodeCapitalProjectIdPathParams["managingCode"],
  capitalProjectId: FindCapitalCommitmentsByManagingCodeCapitalProjectIdPathParams["capitalProjectId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalCommitmentsByManagingCodeCapitalProjectIdQueryResponse>["data"]
> {
  const res =
    await client<FindCapitalCommitmentsByManagingCodeCapitalProjectIdQueryResponse>(
      {
        method: "get",
        url: `/capital-projects/${managingCode}/${capitalProjectId}/capital-commitments`,
        ...options,
      },
    );
  return res.data;
}
