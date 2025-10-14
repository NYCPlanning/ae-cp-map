import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityBoardBudgetRequestNeedGroup } from "../types/CommunityBoardBudgetRequestNeedGroup";

export function createCommunityBoardBudgetRequestNeedGroup(
  data: NonNullable<Partial<CommunityBoardBudgetRequestNeedGroup>> = {},
): NonNullable<CommunityBoardBudgetRequestNeedGroup> {
  return {
    ...{ id: faker.number.int(), description: faker.string.alpha() },
    ...data,
  };
}
