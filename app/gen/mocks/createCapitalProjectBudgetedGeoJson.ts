import { createMultiPoint } from "./createMultiPoint";
import { createMultiPolygon } from "./createMultiPolygon";
import { createCapitalProjectBudgeted } from "./createCapitalProjectBudgeted";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CapitalProjectBudgetedGeoJson } from "../types/CapitalProjectBudgetedGeoJson";

export function createCapitalProjectBudgetedGeoJson(
  data: NonNullable<Partial<CapitalProjectBudgetedGeoJson>> = {},
): NonNullable<CapitalProjectBudgetedGeoJson> {
  return {
    ...{
      id: faker.string.alpha(),
      type: faker.helpers.arrayElement<any>(["Feature"]),
      geometry: faker.helpers.arrayElement<any>([
        createMultiPoint(),
        createMultiPolygon(),
      ]),
      properties: createCapitalProjectBudgeted(),
    },
    ...data,
  };
}
