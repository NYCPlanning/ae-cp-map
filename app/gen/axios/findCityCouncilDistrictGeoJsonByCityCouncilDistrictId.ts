import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdQueryResponse,
  FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdPathParams,
} from "../types/FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId";

/**
 * @summary Find GeoJson for a specific city council district
 * @link /city-council-districts/:cityCouncilDistrictId/geojson
 */
export async function findCityCouncilDistrictGeoJsonByCityCouncilDistrictId(
  cityCouncilDistrictId: FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdPathParams["cityCouncilDistrictId"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdQueryResponse>(
      {
        method: "get",
        url: `/city-council-districts/${cityCouncilDistrictId}/geojson`,
        baseURL: "https://zoning.planningdigital.com/api",
        ...options,
      },
    );
  return res.data;
}
