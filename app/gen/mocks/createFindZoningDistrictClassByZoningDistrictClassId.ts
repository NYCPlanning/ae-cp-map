import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createZoningDistrictClass } from "./createZoningDistrictClass";
import { createError } from "./createError";
import type {
  FindZoningDistrictClassByZoningDistrictClassIdPathParams,
  FindZoningDistrictClassByZoningDistrictClassId200,
  FindZoningDistrictClassByZoningDistrictClassId400,
  FindZoningDistrictClassByZoningDistrictClassId404,
  FindZoningDistrictClassByZoningDistrictClassId500,
  FindZoningDistrictClassByZoningDistrictClassIdQueryResponse,
} from "../types/FindZoningDistrictClassByZoningDistrictClassId";

export function createFindZoningDistrictClassByZoningDistrictClassIdPathParams(): NonNullable<FindZoningDistrictClassByZoningDistrictClassIdPathParams> {
  return {
    id: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^[A-z][0-9]+$").gen(),
    ]),
  };
}

/**
 * @description A class schema for a zoning district
 */
export function createFindZoningDistrictClassByZoningDistrictClassId200(): NonNullable<FindZoningDistrictClassByZoningDistrictClassId200> {
  return createZoningDistrictClass();
}

/**
 * @description Invalid client request
 */
export function createFindZoningDistrictClassByZoningDistrictClassId400(): NonNullable<FindZoningDistrictClassByZoningDistrictClassId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindZoningDistrictClassByZoningDistrictClassId404(): NonNullable<FindZoningDistrictClassByZoningDistrictClassId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindZoningDistrictClassByZoningDistrictClassId500(): NonNullable<FindZoningDistrictClassByZoningDistrictClassId500> {
  return createError();
}

/**
 * @description A class schema for a zoning district
 */
export function createFindZoningDistrictClassByZoningDistrictClassIdQueryResponse(): NonNullable<FindZoningDistrictClassByZoningDistrictClassIdQueryResponse> {
  return createZoningDistrictClass();
}
