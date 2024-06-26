import { createZoningDistrictClassCategory } from "./createZoningDistrictClassCategory";
import { faker } from "@faker-js/faker";
import type { ZoningDistrictClassCategoryColor } from "../types/ZoningDistrictClassCategoryColor";

export function createZoningDistrictClassCategoryColor(
  data: NonNullable<Partial<ZoningDistrictClassCategoryColor>> = {},
): NonNullable<ZoningDistrictClassCategoryColor> {
  return {
    ...{
      category: createZoningDistrictClassCategory(),
      color: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("^#([A-Fa-f0-9]{8})$")),
      ]),
    },
    ...data,
  };
}
