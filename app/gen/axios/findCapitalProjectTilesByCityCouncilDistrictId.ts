import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCapitalProjectTilesByCityCouncilDistrictIdQueryResponse,
  FindCapitalProjectTilesByCityCouncilDistrictIdPathParams,
} from "../types/FindCapitalProjectTilesByCityCouncilDistrictId";

/**
 * @summary Mapbox Vector Tiles for capital projects intersecting a city council district
 * @link /city-council-districts/:cityCouncilDistrictId/capital-projects/:z/:x/:y.pbf
 */
export async function findCapitalProjectTilesByCityCouncilDistrictId(
  cityCouncilDistrictId: FindCapitalProjectTilesByCityCouncilDistrictIdPathParams["cityCouncilDistrictId"],
  z: FindCapitalProjectTilesByCityCouncilDistrictIdPathParams["z"],
  x: FindCapitalProjectTilesByCityCouncilDistrictIdPathParams["x"],
  y: FindCapitalProjectTilesByCityCouncilDistrictIdPathParams["y"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCapitalProjectTilesByCityCouncilDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindCapitalProjectTilesByCityCouncilDistrictIdQueryResponse>({
      method: "get",
      url: `/city-council-districts/${cityCouncilDistrictId}/capital-projects/${z}/${x}/${y}.pbf`,
      ...options,
    });
  return res.data;
}
