import { faker } from "@faker-js/faker";
import type { ZoningDistrictClassCategory } from "../types/ZoningDistrictClassCategory";

/**
 * @description The type of zoning district.
 */
export function createZoningDistrictClassCategory(): NonNullable<ZoningDistrictClassCategory> {
  return faker.helpers.arrayElement<any>([
    "Residential",
    "Commercial",
    "Manufacturing",
  ]);
}
