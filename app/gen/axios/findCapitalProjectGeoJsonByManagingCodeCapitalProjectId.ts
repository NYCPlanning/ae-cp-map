import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdQueryResponse,
  FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdPathParams,
} from "../types/FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId";

/**
 * @summary Find a single capital project as a geojson feature
 * @link /capital-projects/:managingCode/:capitalProjectId/geojson
 */
export async function findCapitalProjectGeoJsonByManagingCodeCapitalProjectId(
  managingCode: FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdPathParams["managingCode"],
  capitalProjectId: FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdPathParams["capitalProjectId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdQueryResponse>["data"]
> {
  const res =
    await client<FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdQueryResponse>(
      {
        method: "get",
        url: `/capital-projects/${managingCode}/${capitalProjectId}/geojson`,
        ...options,
      },
    );
  return res.data;
}
