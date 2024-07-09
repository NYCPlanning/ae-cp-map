import { createZoningDistrictClassCategory } from "./createZoningDistrictClassCategory";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { ZoningDistrictClassCategoryColor } from "../types/ZoningDistrictClassCategoryColor";

export function createZoningDistrictClassCategoryColor(
  data: NonNullable<Partial<ZoningDistrictClassCategoryColor>> = {},
): NonNullable<ZoningDistrictClassCategoryColor> {
  return {
    ...{
      category: createZoningDistrictClassCategory(),
      color: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^#([A-Fa-f0-9]{8})$").gen(),
      ]),
    },
    ...data,
  };
}
