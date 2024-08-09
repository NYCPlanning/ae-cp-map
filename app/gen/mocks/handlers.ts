import { findAgenciesHandler } from "./findAgenciesHandler";
import { findBoroughsHandler } from "./findBoroughsHandler";
import { findCommunityDistrictsByBoroughIdHandler } from "./findCommunityDistrictsByBoroughIdHandler";
import { findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdHandler } from "./findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdHandler";
import { findCapitalProjectsByBoroughIdCommunityDistrictIdHandler } from "./findCapitalProjectsByBoroughIdCommunityDistrictIdHandler";
import { findCapitalCommitmentTypesHandler } from "./findCapitalCommitmentTypesHandler";
import { findCapitalCommitmentsByManagingCodeCapitalProjectIdHandler } from "./findCapitalCommitmentsByManagingCodeCapitalProjectIdHandler";
import { findCapitalProjectGeoJsonByManagingCodeCapitalProjectIdHandler } from "./findCapitalProjectGeoJsonByManagingCodeCapitalProjectIdHandler";
import { findCapitalProjectByManagingCodeCapitalProjectIdHandler } from "./findCapitalProjectByManagingCodeCapitalProjectIdHandler";
import { findCapitalProjectTilesHandler } from "./findCapitalProjectTilesHandler";
import { findCityCouncilDistrictsHandler } from "./findCityCouncilDistrictsHandler";
import { findCityCouncilDistrictGeoJsonByCityCouncilDistrictIdHandler } from "./findCityCouncilDistrictGeoJsonByCityCouncilDistrictIdHandler";
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
  findBoroughsHandler,
  findCommunityDistrictsByBoroughIdHandler,
  findCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdHandler,
  findCapitalProjectsByBoroughIdCommunityDistrictIdHandler,
  findCapitalCommitmentTypesHandler,
  findCapitalCommitmentsByManagingCodeCapitalProjectIdHandler,
  findCapitalProjectGeoJsonByManagingCodeCapitalProjectIdHandler,
  findCapitalProjectByManagingCodeCapitalProjectIdHandler,
  findCapitalProjectTilesHandler,
  findCityCouncilDistrictsHandler,
  findCityCouncilDistrictGeoJsonByCityCouncilDistrictIdHandler,
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
