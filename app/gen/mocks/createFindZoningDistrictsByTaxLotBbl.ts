import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createZoningDistrict } from "./createZoningDistrict";
import { createError } from "./createError";
import type {
  FindZoningDistrictsByTaxLotBblPathParams,
  FindZoningDistrictsByTaxLotBbl200,
  FindZoningDistrictsByTaxLotBbl400,
  FindZoningDistrictsByTaxLotBbl404,
  FindZoningDistrictsByTaxLotBbl500,
  FindZoningDistrictsByTaxLotBblQueryResponse,
} from "../types/FindZoningDistrictsByTaxLotBbl";

export function createFindZoningDistrictsByTaxLotBblPathParams(): NonNullable<FindZoningDistrictsByTaxLotBblPathParams> {
  return {
    bbl: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{10})$").gen(),
    ]),
  };
}

/**
 * @description An object containing zoning districts.
 */
export function createFindZoningDistrictsByTaxLotBbl200(): NonNullable<FindZoningDistrictsByTaxLotBbl200> {
  return {
    zoningDistricts: faker.helpers.arrayElements([
      createZoningDistrict(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindZoningDistrictsByTaxLotBbl400(): NonNullable<FindZoningDistrictsByTaxLotBbl400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindZoningDistrictsByTaxLotBbl404(): NonNullable<FindZoningDistrictsByTaxLotBbl404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindZoningDistrictsByTaxLotBbl500(): NonNullable<FindZoningDistrictsByTaxLotBbl500> {
  return createError();
}

/**
 * @description An object containing zoning districts.
 */
export function createFindZoningDistrictsByTaxLotBblQueryResponse(): NonNullable<FindZoningDistrictsByTaxLotBblQueryResponse> {
  return {
    zoningDistricts: faker.helpers.arrayElements([
      createZoningDistrict(),
    ]) as any,
  };
}
