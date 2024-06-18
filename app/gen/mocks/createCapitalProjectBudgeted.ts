import { createCapitalProject } from "./createCapitalProject";
import { faker } from "@faker-js/faker";
import type { CapitalProjectBudgeted } from "../types/CapitalProjectBudgeted";

export function createCapitalProjectBudgeted(
  data?: NonNullable<Partial<CapitalProjectBudgeted>>,
): NonNullable<CapitalProjectBudgeted> {
  return Object.assign({}, createCapitalProject(), {
    commitmentsTotal: faker.number.float(),
    sponsoringAgencyInitials: faker.helpers.arrayElements([
      faker.string.alpha(),
    ]) as any,
    budgetType: faker.helpers.arrayElements([faker.string.alpha()]) as any,
  });
}
