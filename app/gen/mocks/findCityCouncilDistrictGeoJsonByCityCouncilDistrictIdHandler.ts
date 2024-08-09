import { http } from "msw";
import { createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdQueryResponse } from "./createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictId";

export const findCityCouncilDistrictGeoJsonByCityCouncilDistrictIdHandler =
  http.get(
    "*/city-council-districts/:cityCouncilDistrictId/geojson",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
