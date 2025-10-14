import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityBoardBudgetRequestAgencyResponseType } from "../types/CommunityBoardBudgetRequestAgencyResponseType";

export function createCommunityBoardBudgetRequestAgencyResponseType(
  data: NonNullable<
    Partial<CommunityBoardBudgetRequestAgencyResponseType>
  > = {},
): NonNullable<CommunityBoardBudgetRequestAgencyResponseType> {
  return {
    ...{ id: faker.number.int(), description: faker.string.alpha() },
    ...data,
  };
}
