import { faker } from "@faker-js/faker";
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
        faker.helpers.fromRegExp(new RegExp("^([A-z]{4})$")),
      ]),
      plannedDate: faker.date.anytime().toString(),
      budgetLineCode: faker.string.alpha(),
      budgetLineId: faker.string.alpha(),
      sponsoringAgencyInitials: faker.string.alpha(),
      budgetType: faker.string.alpha(),
      totalValue: faker.number.float(),
    },
    ...data,
  };
}
