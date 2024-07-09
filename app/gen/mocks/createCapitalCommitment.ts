import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CapitalCommitment } from "../types/CapitalCommitment";

export function createCapitalCommitment(
  data: NonNullable<Partial<CapitalCommitment>> = {},
): NonNullable<CapitalCommitment> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.string.uuid(),
      ]),
      type: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([A-z]{4})$").gen(),
      ]),
      plannedDate: faker.date.anytime().toString(),
      budgetLineCode: faker.string.alpha(),
      budgetLineId: faker.string.alpha(),
      sponsoringAgencies: faker.string.alpha(),
      budgetType: faker.string.alpha(),
      totalValue: faker.number.float(),
    },
    ...data,
  };
}
