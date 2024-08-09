import { http } from "msw";
import { createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdQueryResponse } from "./createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId";

export const findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdHandler =
  http.get(
    "*/boroughs/:boroughId/community-districts/:communityDistrictId/geojson",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
