import { faker } from "@faker-js/faker";
import type { Borough } from "../types/Borough";

export function createBorough(
  data: NonNullable<Partial<Borough>> = {},
): NonNullable<Borough> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("[0-9]")),
      ]),
      title: faker.string.alpha(),
      abbr: faker.string.alpha(),
    },
    ...data,
  };
}
