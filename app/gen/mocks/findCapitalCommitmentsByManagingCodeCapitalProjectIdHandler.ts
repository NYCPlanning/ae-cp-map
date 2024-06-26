import { http } from "msw";
import { createFindCapitalCommitmentsByManagingCodeCapitalProjectIdQueryResponse } from "./createFindCapitalCommitmentsByManagingCodeCapitalProjectId";

export const findCapitalCommitmentsByManagingCodeCapitalProjectIdHandler =
  http.get(
    "*/capital-projects/:managingCode/:capitalProjectId/capital-commitments",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCapitalCommitmentsByManagingCodeCapitalProjectIdQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
