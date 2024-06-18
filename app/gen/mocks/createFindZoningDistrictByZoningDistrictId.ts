import { faker } from "@faker-js/faker";
import { createZoningDistrict } from "./createZoningDistrict";
import { createError } from "./createError";
import type {
  FindZoningDistrictByZoningDistrictIdPathParams,
  FindZoningDistrictByZoningDistrictId200,
  FindZoningDistrictByZoningDistrictId400,
  FindZoningDistrictByZoningDistrictId404,
  FindZoningDistrictByZoningDistrictId500,
  FindZoningDistrictByZoningDistrictIdQueryResponse,
} from "../types/FindZoningDistrictByZoningDistrictId";

export function createFindZoningDistrictByZoningDistrictIdPathParams(): NonNullable<FindZoningDistrictByZoningDistrictIdPathParams> {
  return {
    id: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      faker.string.uuid(),
    ]),
  };
}

/**
 * @description A zoning district object
 */
export function createFindZoningDistrictByZoningDistrictId200(): NonNullable<FindZoningDistrictByZoningDistrictId200> {
  return createZoningDistrict();
}

/**
 * @description Invalid client request
 */
export function createFindZoningDistrictByZoningDistrictId400(): NonNullable<FindZoningDistrictByZoningDistrictId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindZoningDistrictByZoningDistrictId404(): NonNullable<FindZoningDistrictByZoningDistrictId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindZoningDistrictByZoningDistrictId500(): NonNullable<FindZoningDistrictByZoningDistrictId500> {
  return createError();
}

/**
 * @description A zoning district object
 */
export function createFindZoningDistrictByZoningDistrictIdQueryResponse(): NonNullable<FindZoningDistrictByZoningDistrictIdQueryResponse> {
  return createZoningDistrict();
}
