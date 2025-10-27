import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityBoardBudgetRequestAgencyCategoryResponse } from "../types/CommunityBoardBudgetRequestAgencyCategoryResponse";

export function createCommunityBoardBudgetRequestAgencyCategoryResponse(
  data: NonNullable<
    Partial<CommunityBoardBudgetRequestAgencyCategoryResponse>
  > = {},
): NonNullable<CommunityBoardBudgetRequestAgencyCategoryResponse> {
  return {
    ...{ id: faker.number.int(), description: faker.string.alpha() },
    ...data,
  };
}
