import { createZoningDistrictClassCategory } from "./createZoningDistrictClassCategory";
import { faker } from "@faker-js/faker";
import type { ZoningDistrictClass } from "../types/ZoningDistrictClass";

export function createZoningDistrictClass(
  data: NonNullable<Partial<ZoningDistrictClass>> = {},
): NonNullable<ZoningDistrictClass> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("^[A-Z][0-9]+$")),
      ]),
      category: createZoningDistrictClassCategory(),
      description: faker.string.alpha(),
      url: faker.string.alpha(),
      color: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("^#([A-Fa-f0-9]{8})$")),
      ]),
    },
    ...data,
  };
}
