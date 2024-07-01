import { faker } from "@faker-js/faker";
import type { Page } from "../types/Page";

export function createPage(
  data: NonNullable<Partial<Page>> = {},
): NonNullable<Page> {
  return {
    ...{
      limit: faker.number.int(),
      offset: faker.number.int(),
      total: faker.number.int(),
      order: faker.string.alpha(),
    },
    ...data,
  };
}
