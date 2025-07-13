import { type RouteConfig } from "@remix-run/route-config";
import { remixRoutesOptionAdapter } from "@remix-run/routes-option-adapter";

export default remixRoutesOptionAdapter((defineRoutes) => {
  return defineRoutes((route) => {
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
      "boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects",
      "routes/boroughs.$boroughId.community-districts.$communityDistrictId.capital-projects.tsx",
    );
    route(
      "city-council-districts/:cityCouncilDistrictId/capital-projects/:managingCode/:capitalProjectId",
      "routes/city-council-districts.$cityCouncilDistrictId.capital-projects_.$managingCode.$capitalProjectId.tsx",
    );
    route(
      "city-council-districts/:cityCouncilDistrictId/capital-projects",
      "routes/city-council-districts.$cityCouncilDistrictId.capital-projects.tsx",
    );
  });
}) satisfies RouteConfig;
