import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("capital-projects", "components/ResultsPanel/CapitalProjects.tsx"),
  route(
    "community-board-budget-requests",
    "components/ResultsPanel/CommunityBoardBudgetRequests.tsx",
  ),
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
] satisfies RouteConfig;
