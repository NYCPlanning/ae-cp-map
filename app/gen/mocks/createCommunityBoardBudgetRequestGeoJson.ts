import { createMultiPoint } from "./createMultiPoint";
import { createMultiPolygon } from "./createMultiPolygon";
import { createCommunityBoardBudgetRequest } from "./createCommunityBoardBudgetRequest";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityBoardBudgetRequestGeoJson } from "../types/CommunityBoardBudgetRequestGeoJson";

export function createCommunityBoardBudgetRequestGeoJson(
  data: NonNullable<Partial<CommunityBoardBudgetRequestGeoJson>> = {},
): NonNullable<CommunityBoardBudgetRequestGeoJson> {
  return {
    ...{
      id: faker.string.alpha(),
      type: faker.helpers.arrayElement<any>(["Feature"]),
      geometry: faker.helpers.arrayElement<any>([
        createMultiPoint(),
        createMultiPolygon(),
      ]),
      properties: createCommunityBoardBudgetRequest(),
    },
    ...data,
  };
}
