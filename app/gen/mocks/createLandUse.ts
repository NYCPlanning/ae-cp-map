import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { LandUse } from "../types/LandUse";

export function createLandUse(
  data: NonNullable<Partial<LandUse>> = {},
): NonNullable<LandUse> {
  return {
    ...{
      id: faker.string.alpha(),
      description: faker.string.alpha(),
      color: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^#([A-Fa-f0-9]{8})$").gen(),
      ]),
    },
    ...data,
  };
}
