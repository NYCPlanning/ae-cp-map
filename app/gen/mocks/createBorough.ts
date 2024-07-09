import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { Borough } from "../types/Borough";

export function createBorough(
  data: NonNullable<Partial<Borough>> = {},
): NonNullable<Borough> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([0-9])$").gen(),
      ]),
      title: faker.string.alpha(),
      abbr: faker.string.alpha(),
    },
    ...data,
  };
}
