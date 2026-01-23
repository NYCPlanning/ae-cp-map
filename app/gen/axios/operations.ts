export const operations = {
  findAgencies: {
    path: "/agencies",
    method: "get",
  },
  findAgencyBudgets: {
    path: "/agency-budgets",
    method: "get",
  },
  findBoroughs: {
    path: "/boroughs",
    method: "get",
  },
  findCommunityDistrictsByBoroughId: {
    path: "/boroughs/:boroughId/community-districts",
    method: "get",
  },
  findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId: {
    path: "/boroughs/:boroughId/community-districts/:communityDistrictId/geojson",
    method: "get",
  },
  findCapitalProjectsByBoroughIdCommunityDistrictId: {
    path: "/boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects",
    method: "get",
  },
  findCapitalProjectTilesByBoroughIdCommunityDistrictId: {
    path: "/boroughs/:boroughId/community-districts/:communityDistrictId/capital-projects/:z/:x/:y.pbf",
    method: "get",
  },
  findCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId: {
    path: "/boroughs/:boroughId/community-districts/:communityDistrictId/community-board-budget-requests/:z/:x/:y.pbf",
    method: "get",
  },
  findCapitalCommitmentTypes: {
    path: "/capital-commitment-types",
    method: "get",
  },
  findCapitalProjects: {
    path: "/capital-projects",
    method: "get",
  },
  findCapitalCommitmentsByManagingCodeCapitalProjectId: {
    path: "/capital-projects/:managingCode/:capitalProjectId/capital-commitments",
    method: "get",
  },
  findCapitalProjectGeoJsonByManagingCodeCapitalProjectId: {
    path: "/capital-projects/:managingCode/:capitalProjectId/geojson",
    method: "get",
  },
  findCapitalProjectByManagingCodeCapitalProjectId: {
    path: "/capital-projects/:managingCode/:capitalProjectId",
    method: "get",
  },
  findCapitalProjectManagingAgencies: {
    path: "/capital-projects/managing-agencies",
    method: "get",
  },
  findCapitalProjectTiles: {
    path: "/capital-projects/:z/:x/:y.pbf",
    method: "get",
  },
  findCityCouncilDistricts: {
    path: "/city-council-districts",
    method: "get",
  },
  findCityCouncilDistrictGeoJsonByCityCouncilDistrictId: {
    path: "/city-council-districts/:cityCouncilDistrictId/geojson",
    method: "get",
  },
  findCapitalProjectTilesByCityCouncilDistrictId: {
    path: "/city-council-districts/:cityCouncilDistrictId/capital-projects/:z/:x/:y.pbf",
    method: "get",
  },
  findCommunityBoardBudgetRequestTilesByCityCouncilDistrictId: {
    path: "/city-council-districts/:cityCouncilDistrictId/community-board-budget-requests/:z/:x/:y.pbf",
    method: "get",
  },
  findCapitalProjectsByCityCouncilId: {
    path: "/city-council-districts/:cityCouncilDistrictId/capital-projects",
    method: "get",
  },
  findCityCouncilDistrictTiles: {
    path: "/city-council-districts/:z/:x/:y.pbf",
    method: "get",
  },
  findCommunityBoardBudgetRequests: {
    path: "/community-board-budget-requests",
    method: "get",
  },
  findCommunityBoardBudgetRequestById: {
    path: "/community-board-budget-requests/:cbbrId",
    method: "get",
  },
  findCommunityBoardBudgetRequestGeoJsonById: {
    path: "/community-board-budget-requests/:cbbrId/geojson",
    method: "get",
  },
  findCommunityBoardBudgetRequestAgencies: {
    path: "/community-board-budget-requests/agencies",
    method: "get",
  },
  findCommunityBoardBudgetRequestAgencyCategoryResponses: {
    path: "/community-board-budget-requests/agency-category-responses",
    method: "get",
  },
  findCommunityBoardBudgetRequestsCsv: {
    path: "/community-board-budget-requests/csv",
    method: "get",
  },
  findCommunityBoardBudgetRequestNeedGroups: {
    path: "/community-board-budget-requests/need-groups",
    method: "get",
  },
  findCommunityBoardBudgetRequestPolicyAreas: {
    path: "/community-board-budget-requests/policy-areas",
    method: "get",
  },
  findCommunityBoardBudgetRequestTiles: {
    path: "/community-board-budget-requests/:z/:x/:y.pbf",
    method: "get",
  },
  findCommunityDistrictTiles: {
    path: "/community-districts/:z/:x/:y.pbf",
    method: "get",
  },
  findLandUses: {
    path: "/land-uses",
    method: "get",
  },
  findTaxLots: {
    path: "/tax-lots",
    method: "get",
  },
  findTaxLotByBbl: {
    path: "/tax-lots/:bbl",
    method: "get",
  },
  findTaxLotGeoJsonByBbl: {
    path: "/tax-lots/:bbl/geojson",
    method: "get",
  },
  findZoningDistrictsByTaxLotBbl: {
    path: "/tax-lots/:bbl/zoning-districts",
    method: "get",
  },
  findZoningDistrictClassesByTaxLotBbl: {
    path: "/tax-lots/:bbl/zoning-districts/classes",
    method: "get",
  },
  findZoningDistrictByZoningDistrictId: {
    path: "/zoning-districts/:id",
    method: "get",
  },
  findZoningDistrictClassesByZoningDistrictId: {
    path: "/zoning-districts/:id/classes",
    method: "get",
  },
  findZoningDistrictClasses: {
    path: "/zoning-district-classes",
    method: "get",
  },
  findZoningDistrictClassCategoryColors: {
    path: "/zoning-district-classes/category-colors",
    method: "get",
  },
  findZoningDistrictClassByZoningDistrictClassId: {
    path: "/zoning-district-classes/:id",
    method: "get",
  },
} as const;
