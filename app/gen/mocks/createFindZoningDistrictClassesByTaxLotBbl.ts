import { faker } from "@faker-js/faker";
import { createZoningDistrictClass } from "./createZoningDistrictClass";
import { createError } from "./createError";
import type {
  FindZoningDistrictClassesByTaxLotBblPathParams,
  FindZoningDistrictClassesByTaxLotBbl200,
  FindZoningDistrictClassesByTaxLotBbl400,
  FindZoningDistrictClassesByTaxLotBbl404,
  FindZoningDistrictClassesByTaxLotBbl500,
  FindZoningDistrictClassesByTaxLotBblQueryResponse,
} from "../types/FindZoningDistrictClassesByTaxLotBbl";

export function createFindZoningDistrictClassesByTaxLotBblPathParams(): NonNullable<FindZoningDistrictClassesByTaxLotBblPathParams> {
  return {
    bbl: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      faker.helpers.fromRegExp(new RegExp("^([0-9]{10})$")),
    ]),
  };
}

/**
 * @description An object containing zoning district class schemas.
 */
export function createFindZoningDistrictClassesByTaxLotBbl200(): NonNullable<FindZoningDistrictClassesByTaxLotBbl200> {
  return {
    zoningDistrictClasses: faker.helpers.arrayElements([
      createZoningDistrictClass(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindZoningDistrictClassesByTaxLotBbl400(): NonNullable<FindZoningDistrictClassesByTaxLotBbl400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindZoningDistrictClassesByTaxLotBbl404(): NonNullable<FindZoningDistrictClassesByTaxLotBbl404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindZoningDistrictClassesByTaxLotBbl500(): NonNullable<FindZoningDistrictClassesByTaxLotBbl500> {
  return createError();
}

/**
 * @description An object containing zoning district class schemas.
 */
export function createFindZoningDistrictClassesByTaxLotBblQueryResponse(): NonNullable<FindZoningDistrictClassesByTaxLotBblQueryResponse> {
  return {
    zoningDistrictClasses: faker.helpers.arrayElements([
      createZoningDistrictClass(),
    ]) as any,
  };
}
