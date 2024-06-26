import { createCapitalProjectCategory } from "./createCapitalProjectCategory";
import { faker } from "@faker-js/faker";
import type { CapitalProject } from "../types/CapitalProject";

export function createCapitalProject(
  data: NonNullable<Partial<CapitalProject>> = {},
): NonNullable<CapitalProject> {
  return {
    ...{
      id: faker.string.alpha(),
      description: faker.string.alpha(),
      managingCode: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("^([0-9]{3})$")),
      ]),
      managingAgency: faker.string.alpha(),
      minDate: faker.date.anytime().toString(),
      maxDate: faker.date.anytime().toString(),
      category: createCapitalProjectCategory(),
    },
    ...data,
  };
}
