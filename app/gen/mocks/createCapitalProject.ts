import { createCapitalProjectCategory } from "./createCapitalProjectCategory";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
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
        new RandExp("^([0-9]{3})$").gen(),
      ]),
      managingAgency: faker.string.alpha(),
      minDate: faker.date.anytime().toString(),
      maxDate: faker.date.anytime().toString(),
      category: createCapitalProjectCategory(),
    },
    ...data,
  };
}
