import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { ZoningDistrict } from "../types/ZoningDistrict";

export function createZoningDistrict(
  data: NonNullable<Partial<ZoningDistrict>> = {},
): NonNullable<ZoningDistrict> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.string.uuid(),
      ]),
      label: faker.string.alpha(),
    },
    ...data,
  };
}
