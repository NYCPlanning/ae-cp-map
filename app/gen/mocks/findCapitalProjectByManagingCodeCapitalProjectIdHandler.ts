import { http } from "msw";
import { createFindCapitalProjectByManagingCodeCapitalProjectIdQueryResponse } from "./createFindCapitalProjectByManagingCodeCapitalProjectId";

export const findCapitalProjectByManagingCodeCapitalProjectIdHandler = http.get(
  "*/capital-projects/:managingCode/:capitalProjectId",
  function handler(info) {
    return new Response(
      JSON.stringify(
        createFindCapitalProjectByManagingCodeCapitalProjectIdQueryResponse(),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
);
