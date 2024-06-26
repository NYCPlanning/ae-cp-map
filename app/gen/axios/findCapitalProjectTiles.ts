import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectTilesQueryResponse,
  FindCapitalProjectTilesPathParams,
} from "../types/FindCapitalProjectTiles";

/**
 * @summary Mapbox Vector Tiles for capital projects
 * @link /capital-projects/:z/:x/:y.pbf
 */
export async function findCapitalProjectTiles(
  z: FindCapitalProjectTilesPathParams["z"],
  x: FindCapitalProjectTilesPathParams["x"],
  y: FindCapitalProjectTilesPathParams["y"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindCapitalProjectTilesQueryResponse>["data"]> {
  const res = await client<FindCapitalProjectTilesQueryResponse>({
    method: "get",
    url: `/capital-projects/${z}/${x}/${y}.pbf`,
    ...options,
  });
  return res.data;
}
