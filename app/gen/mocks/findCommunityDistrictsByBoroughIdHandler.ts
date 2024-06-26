import { http } from "msw";
import { createFindCommunityDistrictsByBoroughIdQueryResponse } from "./createFindCommunityDistrictsByBoroughId";

export const findCommunityDistrictsByBoroughIdHandler = http.get(
  "*/boroughs/:boroughId/community-districts",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCommunityDistrictsByBoroughIdQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
