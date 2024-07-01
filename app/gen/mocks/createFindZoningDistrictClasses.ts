import { faker } from "@faker-js/faker";
import { createZoningDistrictClass } from "./createZoningDistrictClass";
import { createError } from "./createError";
import type {
  FindZoningDistrictClasses200,
  FindZoningDistrictClasses400,
  FindZoningDistrictClasses500,
  FindZoningDistrictClassesQueryResponse,
} from "../types/FindZoningDistrictClasses";

/**
 * @description An object containing all zoning district class schemas.
 */
export function createFindZoningDistrictClasses200(): NonNullable<FindZoningDistrictClasses200> {
  return {
    zoningDistrictClasses: faker.helpers.arrayElements([
      createZoningDistrictClass(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindZoningDistrictClasses400(): NonNullable<FindZoningDistrictClasses400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindZoningDistrictClasses500(): NonNullable<FindZoningDistrictClasses500> {
  return createError();
}

/**
 * @description An object containing all zoning district class schemas.
 */
export function createFindZoningDistrictClassesQueryResponse(): NonNullable<FindZoningDistrictClassesQueryResponse> {
  return {
    zoningDistrictClasses: faker.helpers.arrayElements([
      createZoningDistrictClass(),
    ]) as any,
  };
}
