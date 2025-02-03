import { http } from "msw";
import { createFindAgencyBudgetsQueryResponse } from "./createFindAgencyBudgets";

export const findAgencyBudgetsHandler = http.get(
  "*/agencyBugdets",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindAgencyBudgetsQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
