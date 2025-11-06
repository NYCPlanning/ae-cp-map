import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("layouts/MapPage.tsx", [
    index("routes/home.tsx"),
    layout("layouts/ResultsPanel.tsx", [
      route(
        "community-board-budget-requests",
        "routes/community-board-budget-requests.tsx",
      ),
      route("capital-projects", "routes/capital-projects.tsx"),
    ]),
    route(
      "capital-projects/:managingCode/:capitalProjectId",
      "routes/capital-projects_.$managingCode.$capitalProjectId.tsx",
    ),
    route(
      "boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects/:managingCode/:capitalProjectId",
      "routes/boroughs.$boroughId.community-districts.$communityDistrictId.capital-projects_.$managingCode.$capitalProjectId.tsx",
    ),
    route(
      "city-council-districts/:cityCouncilDistrictId/capital-projects/:managingCode/:capitalProjectId",
      "routes/city-council-districts.$cityCouncilDistrictId.capital-projects_.$managingCode.$capitalProjectId.tsx",
    ),
    route(
      "community-board-budget-requests/:cbbrId",
      "routes/community-board-budget-requests_.$cbbrId.tsx",
    ),
  ]),
  layout("layouts/NonMapPage.tsx", [route("about", "routes/about.tsx")]),
] satisfies RouteConfig;
