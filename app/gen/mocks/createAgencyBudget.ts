import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { AgencyBudget } from "../types/AgencyBudget";

export function createAgencyBudget(
  data: NonNullable<Partial<AgencyBudget>> = {},
): NonNullable<AgencyBudget> {
  return {
    ...{
      code: faker.string.alpha(),
      type: faker.string.alpha(),
      sponsor: faker.string.alpha(),
    },
    ...data,
  };
}
