import { http } from "msw";
import { createFindCityCouncilDistrictsQueryResponse } from "./createFindCityCouncilDistricts";

export const findCityCouncilDistrictsHandler = http.get(
  "*/city-council-districts",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCityCouncilDistrictsQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
