import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCityCouncilDistrictTilesQueryResponse,
  FindCityCouncilDistrictTilesPathParams,
} from "../types/FindCityCouncilDistrictTiles";

/**
 * @summary 🚧 Mapbox Vector Tiles for city council districts
 * @link /city-council-districts/:z/:x/:y.pbf
 */
export async function findCityCouncilDistrictTiles(
  z: FindCityCouncilDistrictTilesPathParams["z"],
  x: FindCityCouncilDistrictTilesPathParams["x"],
  y: FindCityCouncilDistrictTilesPathParams["y"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindCityCouncilDistrictTilesQueryResponse>["data"]> {
  const res = await client<FindCityCouncilDistrictTilesQueryResponse>({
    method: "get",
    url: `/city-council-districts/${z}/${x}/${y}.pbf`,
    ...options,
  });
  return res.data;
}
