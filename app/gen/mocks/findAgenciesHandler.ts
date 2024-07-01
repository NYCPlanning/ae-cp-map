import { http } from "msw";
import { createFindAgenciesQueryResponse } from "./createFindAgencies";

export const findAgenciesHandler = http.get(
  "*/agencies",
  function handler(info) {
    return new Response(JSON.stringify(createFindAgenciesQueryResponse()), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
);
