import { faker } from "@faker-js/faker";
import type { Borough } from "../types/Borough";

export function createBorough(
  data: NonNullable<Partial<Borough>> = {},
): NonNullable<Borough> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("\\b[1-9]\\b")),
      ]),
      title: faker.string.alpha(),
      abbr: faker.string.alpha(),
    },
    ...data,
  };
}
