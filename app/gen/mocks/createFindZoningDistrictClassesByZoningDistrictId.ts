import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createZoningDistrictClass } from "./createZoningDistrictClass";
import { createError } from "./createError";
import type {
  FindZoningDistrictClassesByZoningDistrictIdPathParams,
  FindZoningDistrictClassesByZoningDistrictId200,
  FindZoningDistrictClassesByZoningDistrictId400,
  FindZoningDistrictClassesByZoningDistrictId404,
  FindZoningDistrictClassesByZoningDistrictId500,
  FindZoningDistrictClassesByZoningDistrictIdQueryResponse,
} from "../types/FindZoningDistrictClassesByZoningDistrictId";

export function createFindZoningDistrictClassesByZoningDistrictIdPathParams(): NonNullable<FindZoningDistrictClassesByZoningDistrictIdPathParams> {
  return {
    id: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      faker.string.uuid(),
    ]),
  };
}

/**
 * @description An object of class schemas for the zoning district.
 */
export function createFindZoningDistrictClassesByZoningDistrictId200(): NonNullable<FindZoningDistrictClassesByZoningDistrictId200> {
  return {
    zoningDistrictClasses: faker.helpers.arrayElements([
      createZoningDistrictClass(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindZoningDistrictClassesByZoningDistrictId400(): NonNullable<FindZoningDistrictClassesByZoningDistrictId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindZoningDistrictClassesByZoningDistrictId404(): NonNullable<FindZoningDistrictClassesByZoningDistrictId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindZoningDistrictClassesByZoningDistrictId500(): NonNullable<FindZoningDistrictClassesByZoningDistrictId500> {
  return createError();
}

/**
 * @description An object of class schemas for the zoning district.
 */
export function createFindZoningDistrictClassesByZoningDistrictIdQueryResponse(): NonNullable<FindZoningDistrictClassesByZoningDistrictIdQueryResponse> {
  return {
    zoningDistrictClasses: faker.helpers.arrayElements([
      createZoningDistrictClass(),
    ]) as any,
  };
}
