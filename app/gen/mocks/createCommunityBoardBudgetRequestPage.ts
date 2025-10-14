import { createPage } from "./createPage";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityBoardBudgetRequestPage } from "../types/CommunityBoardBudgetRequestPage";

export function createCommunityBoardBudgetRequestPage(
  data?: NonNullable<Partial<CommunityBoardBudgetRequestPage>>,
): NonNullable<CommunityBoardBudgetRequestPage> {
  return Object.assign({}, createPage(), {
    communityBoardBudgetRequests: faker.helpers.arrayElements([
      {
        id: faker.string.alpha(),
        cbbrPolicyAreaId: faker.number.int(),
        title: faker.string.alpha(),
        communityBoardId: faker.string.alpha(),
        isMapped: faker.datatype.boolean(),
        isContinuedSupport: faker.datatype.boolean(),
      },
    ]) as any,
    totalBudgetRequests: faker.number.int(),
  });
}
