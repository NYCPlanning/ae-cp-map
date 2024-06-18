import { faker } from "@faker-js/faker";
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
        faker.helpers.fromRegExp(new RegExp("^#([A-Fa-f0-9]{8})$")),
      ]),
    },
    ...data,
  };
}
