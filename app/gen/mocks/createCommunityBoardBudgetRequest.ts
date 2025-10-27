import { createCommunityBoardBudgetRequestType } from "./createCommunityBoardBudgetRequestType";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityBoardBudgetRequest } from "../types/CommunityBoardBudgetRequest";

export function createCommunityBoardBudgetRequest(
  data: NonNullable<Partial<CommunityBoardBudgetRequest>> = {},
): NonNullable<CommunityBoardBudgetRequest> {
  return {
    ...{
      id: faker.string.alpha(),
      cbbrPolicyAreaId: faker.number.int(),
      title: faker.string.alpha(),
      description: faker.string.alpha(),
      communityBoardId: faker.string.alpha(),
      agencyInitials: faker.string.alpha(),
      priority: faker.number.float(),
      cbbrType: createCommunityBoardBudgetRequestType(),
      isMapped: faker.datatype.boolean(),
      isContinuedSupport: faker.datatype.boolean(),
      cbbrAgencyCategoryResponseId: faker.number.float(),
      cbbrAgencyResponse: faker.string.alpha(),
    },
    ...data,
  };
}
