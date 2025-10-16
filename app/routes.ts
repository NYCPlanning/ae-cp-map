import { type RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default remixRoutesOptionAdapter((defineRoutes) => {
  return defineRoutes((route) => {
    route("/", "routes/home.tsx");
    route("capital-projects", "routes/capital-projects.tsx");
    route(
      "capital-projects/:managingCode/:capitalProjectId",
      "routes/capital-projects_.$managingCode.$capitalProjectId.tsx",
    );
    route(
      "boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects/:managingCode/:capitalProjectId",
      "routes/boroughs.$boroughId.community-districts.$communityDistrictId.capital-projects_.$managingCode.$capitalProjectId.tsx",
    );
    route(
      "city-council-districts/:cityCouncilDistrictId/capital-projects/:managingCode/:capitalProjectId",
      "routes/city-council-districts.$cityCouncilDistrictId.capital-projects_.$managingCode.$capitalProjectId.tsx",
    );
    route(
      "community-board-budget-requests/:cbbrId",
      "routes/community-board-budget-requests_.$cbbrId.tsx",
    );
  });
}) satisfies RouteConfig;
