export const operations = {
  findAgencies: {
    path: "/agencies",
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
  findCapitalCommitmentTypes: {
    path: "/capital-commitment-types",
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
  findCapitalProjectsByCityCouncilId: {
    path: "/city-council-districts/:cityCouncilDistrictId/capital-projects",
    method: "get",
  },
  findCityCouncilDistrictTiles: {
    path: "/city-council-districts/:z/:x/:y.pbf",
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
