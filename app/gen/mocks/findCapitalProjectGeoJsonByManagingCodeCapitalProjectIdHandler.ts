import { http } from "msw";
import { createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdQueryResponse } from "./createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectId";

export const findCapitalProjectGeoJsonByManagingCodeCapitalProjectIdHandler =
  http.get(
    "*/capital-projects/:managingCode/:capitalProjectId/geojson",
    function handler(info) {
      return new Response(
        JSON.stringify(
          createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdQueryResponse(),
        ),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
  );
