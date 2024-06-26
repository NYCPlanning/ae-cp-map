import { faker } from "@faker-js/faker";
import { createZoningDistrictClassCategoryColor } from "./createZoningDistrictClassCategoryColor";
import { createError } from "./createError";
import type {
  FindZoningDistrictClassCategoryColors200,
  FindZoningDistrictClassCategoryColors400,
  FindZoningDistrictClassCategoryColors500,
  FindZoningDistrictClassCategoryColorsQueryResponse,
} from "../types/FindZoningDistrictClassCategoryColors";

/**
 * @description An object containing all zoning district category colors.
 */
export function createFindZoningDistrictClassCategoryColors200(): NonNullable<FindZoningDistrictClassCategoryColors200> {
  return {
    zoningDistrictClassCategoryColors: faker.helpers.arrayElements([
      createZoningDistrictClassCategoryColor(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindZoningDistrictClassCategoryColors400(): NonNullable<FindZoningDistrictClassCategoryColors400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindZoningDistrictClassCategoryColors500(): NonNullable<FindZoningDistrictClassCategoryColors500> {
  return createError();
}

/**
 * @description An object containing all zoning district category colors.
 */
export function createFindZoningDistrictClassCategoryColorsQueryResponse(): NonNullable<FindZoningDistrictClassCategoryColorsQueryResponse> {
  return {
    zoningDistrictClassCategoryColors: faker.helpers.arrayElements([
      createZoningDistrictClassCategoryColor(),
    ]) as any,
  };
}
