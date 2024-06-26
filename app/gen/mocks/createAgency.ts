import { faker } from "@faker-js/faker";
import type { Agency } from "../types/Agency";

export function createAgency(
  data: NonNullable<Partial<Agency>> = {},
): NonNullable<Agency> {
  return {
    ...{ initials: faker.string.alpha(), name: faker.string.alpha() },
    ...data,
  };
}
