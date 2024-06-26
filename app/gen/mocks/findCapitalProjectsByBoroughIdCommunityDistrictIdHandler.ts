import { http } from "msw";
import { createFindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse } from "./createFindCapitalProjectsByBoroughIdCommunityDistrictId";

export const findCapitalProjectsByBoroughIdCommunityDistrictIdHandler =
  http.get(
    "*/boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
