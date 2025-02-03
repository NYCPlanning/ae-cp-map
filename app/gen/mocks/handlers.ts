import { findAgenciesHandler } from "./findAgenciesHandler";
import { findAgencyBudgetsHandler } from "./findAgencyBudgetsHandler";
import { findBoroughsHandler } from "./findBoroughsHandler";
import { findCommunityDistrictsByBoroughIdHandler } from "./findCommunityDistrictsByBoroughIdHandler";
import { findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdHandler } from "./findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdHandler";
import { findCapitalProjectsByBoroughIdCommunityDistrictIdHandler } from "./findCapitalProjectsByBoroughIdCommunityDistrictIdHandler";
import { findCapitalProjectTilesByBoroughIdCommunityDistrictIdHandler } from "./findCapitalProjectTilesByBoroughIdCommunityDistrictIdHandler";
import { findCapitalCommitmentTypesHandler } from "./findCapitalCommitmentTypesHandler";
import { findCapitalProjectsHandler } from "./findCapitalProjectsHandler";
import { findCapitalCommitmentsByManagingCodeCapitalProjectIdHandler } from "./findCapitalCommitmentsByManagingCodeCapitalProjectIdHandler";
import { findCapitalProjectGeoJsonByManagingCodeCapitalProjectIdHandler } from "./findCapitalProjectGeoJsonByManagingCodeCapitalProjectIdHandler";
import { findCapitalProjectByManagingCodeCapitalProjectIdHandler } from "./findCapitalProjectByManagingCodeCapitalProjectIdHandler";
import { findCapitalProjectTilesHandler } from "./findCapitalProjectTilesHandler";
import { findCityCouncilDistrictsHandler } from "./findCityCouncilDistrictsHandler";
import { findCityCouncilDistrictGeoJsonByCityCouncilDistrictIdHandler } from "./findCityCouncilDistrictGeoJsonByCityCouncilDistrictIdHandler";
import { findCapitalProjectTilesByCityCouncilDistrictIdHandler } from "./findCapitalProjectTilesByCityCouncilDistrictIdHandler";
import { findCapitalProjectsByCityCouncilIdHandler } from "./findCapitalProjectsByCityCouncilIdHandler";
import { findCityCouncilDistrictTilesHandler } from "./findCityCouncilDistrictTilesHandler";
import { findCommunityDistrictTilesHandler } from "./findCommunityDistrictTilesHandler";
import { findLandUsesHandler } from "./findLandUsesHandler";
import { findTaxLotsHandler } from "./findTaxLotsHandler";
import { findTaxLotByBblHandler } from "./findTaxLotByBblHandler";
import { findTaxLotGeoJsonByBblHandler } from "./findTaxLotGeoJsonByBblHandler";
import { findZoningDistrictsByTaxLotBblHandler } from "./findZoningDistrictsByTaxLotBblHandler";
import { findZoningDistrictClassesByTaxLotBblHandler } from "./findZoningDistrictClassesByTaxLotBblHandler";
import { findZoningDistrictByZoningDistrictIdHandler } from "./findZoningDistrictByZoningDistrictIdHandler";
import { findZoningDistrictClassesByZoningDistrictIdHandler } from "./findZoningDistrictClassesByZoningDistrictIdHandler";
import { findZoningDistrictClassesHandler } from "./findZoningDistrictClassesHandler";
import { findZoningDistrictClassCategoryColorsHandler } from "./findZoningDistrictClassCategoryColorsHandler";
import { findZoningDistrictClassByZoningDistrictClassIdHandler } from "./findZoningDistrictClassByZoningDistrictClassIdHandler";

export const handlers = [
  findAgenciesHandler,
  findAgencyBudgetsHandler,
  findBoroughsHandler,
  findCommunityDistrictsByBoroughIdHandler,
  findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdHandler,
  findCapitalProjectsByBoroughIdCommunityDistrictIdHandler,
  findCapitalProjectTilesByBoroughIdCommunityDistrictIdHandler,
  findCapitalCommitmentTypesHandler,
  findCapitalProjectsHandler,
  findCapitalCommitmentsByManagingCodeCapitalProjectIdHandler,
  findCapitalProjectGeoJsonByManagingCodeCapitalProjectIdHandler,
  findCapitalProjectByManagingCodeCapitalProjectIdHandler,
  findCapitalProjectTilesHandler,
  findCityCouncilDistrictsHandler,
  findCityCouncilDistrictGeoJsonByCityCouncilDistrictIdHandler,
  findCapitalProjectTilesByCityCouncilDistrictIdHandler,
  findCapitalProjectsByCityCouncilIdHandler,
  findCityCouncilDistrictTilesHandler,
  findCommunityDistrictTilesHandler,
  findLandUsesHandler,
  findTaxLotsHandler,
  findTaxLotByBblHandler,
  findTaxLotGeoJsonByBblHandler,
  findZoningDistrictsByTaxLotBblHandler,
  findZoningDistrictClassesByTaxLotBblHandler,
  findZoningDistrictByZoningDistrictIdHandler,
  findZoningDistrictClassesByZoningDistrictIdHandler,
  findZoningDistrictClassesHandler,
  findZoningDistrictClassCategoryColorsHandler,
  findZoningDistrictClassByZoningDistrictClassIdHandler,
] as const;
