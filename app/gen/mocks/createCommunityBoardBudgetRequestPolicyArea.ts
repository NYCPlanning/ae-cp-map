import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityBoardBudgetRequestPolicyArea } from "../types/CommunityBoardBudgetRequestPolicyArea";

export function createCommunityBoardBudgetRequestPolicyArea(
  data: NonNullable<Partial<CommunityBoardBudgetRequestPolicyArea>> = {},
): NonNullable<CommunityBoardBudgetRequestPolicyArea> {
  return {
    ...{ id: faker.number.int(), description: faker.string.alpha() },
    ...data,
  };
}
