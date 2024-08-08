import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCapitalProjectBudgetedGeoJson } from "./createCapitalProjectBudgetedGeoJson";
import { createError } from "./createError";
import type {
  FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdPathParams,
  FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId200,
  FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId400,
  FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId404,
  FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId500,
  FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdQueryResponse,
} from "../types/FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId";

export function createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdPathParams(): NonNullable<FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdPathParams> {
  return {
    managingCode: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{3})$").gen(),
    ]),
    capitalProjectId: faker.string.alpha(),
  };
}

/**
 * @description A capital project geojson object
 */
export function createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectId200(): NonNullable<FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId200> {
  return createCapitalProjectBudgetedGeoJson();
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectId400(): NonNullable<FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectId404(): NonNullable<FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectId500(): NonNullable<FindCapitalProjectGeoJsonByManagingCodeCapitalProjectId500> {
  return createError();
}

/**
 * @description A capital project geojson object
 */
export function createFindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdQueryResponse(): NonNullable<FindCapitalProjectGeoJsonByManagingCodeCapitalProjectIdQueryResponse> {
  return createCapitalProjectBudgetedGeoJson();
}
