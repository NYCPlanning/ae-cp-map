import { http } from "msw";
import { createFindCapitalCommitmentTypesQueryResponse } from "./createFindCapitalCommitmentTypes";

export const findCapitalCommitmentTypesHandler = http.get(
  "*/capital-commitment-types",
  function handler(info) {
    return new Response(
      JSON.stringify(createFindCapitalCommitmentTypesQueryResponse()),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
