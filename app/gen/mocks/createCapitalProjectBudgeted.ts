import { createCapitalProject } from "./createCapitalProject";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CapitalProjectBudgeted } from "../types/CapitalProjectBudgeted";

export function createCapitalProjectBudgeted(
  data?: NonNullable<Partial<CapitalProjectBudgeted>>,
): NonNullable<CapitalProjectBudgeted> {
  return Object.assign({}, createCapitalProject(), {
    commitmentsTotal: faker.number.float(),
    sponsoringAgencies: faker.helpers.arrayElements([
      faker.string.alpha(),
    ]) as any,
    budgetTypes: faker.helpers.arrayElements([faker.string.alpha()]) as any,
  });
}
