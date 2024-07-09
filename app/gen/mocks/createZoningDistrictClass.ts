import { createZoningDistrictClassCategory } from "./createZoningDistrictClassCategory";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { ZoningDistrictClass } from "../types/ZoningDistrictClass";

export function createZoningDistrictClass(
  data: NonNullable<Partial<ZoningDistrictClass>> = {},
): NonNullable<ZoningDistrictClass> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^[A-Z][0-9]+$").gen(),
      ]),
      category: createZoningDistrictClassCategory(),
      description: faker.string.alpha(),
      url: faker.string.alpha(),
      color: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^#([A-Fa-f0-9]{8})$").gen(),
      ]),
    },
    ...data,
  };
}
