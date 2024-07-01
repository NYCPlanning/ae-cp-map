import { faker } from "@faker-js/faker";
import type { CapitalProjectCategory } from "../types/CapitalProjectCategory";

/**
 * @description The type of Capital Project.
 */
export function createCapitalProjectCategory(): NonNullable<CapitalProjectCategory> {
  return faker.helpers.arrayElement<any>([
    "Fixed Asset",
    "Lump Sum",
    "ITT, Vehicles and Equipment",
  ]);
}
