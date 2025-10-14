import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityBoardBudgetRequestPolicyArea } from "./createCommunityBoardBudgetRequestPolicyArea";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestPolicyAreasQueryParams,
  FindCommunityBoardBudgetRequestPolicyAreas200,
  FindCommunityBoardBudgetRequestPolicyAreas400,
  FindCommunityBoardBudgetRequestPolicyAreas500,
  FindCommunityBoardBudgetRequestPolicyAreasQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestPolicyAreas";

export function createFindCommunityBoardBudgetRequestPolicyAreasQueryParams(): NonNullable<FindCommunityBoardBudgetRequestPolicyAreasQueryParams> {
  return {
    cbbrNeedGroupId: faker.number.int(),
    agencyInitials: faker.string.alpha(),
  };
}

/**
 * @description An object containing a list of policy areas
 */
export function createFindCommunityBoardBudgetRequestPolicyAreas200(): NonNullable<FindCommunityBoardBudgetRequestPolicyAreas200> {
  return {
    cbbrPolicyAreas: faker.helpers.arrayElements([
      createCommunityBoardBudgetRequestPolicyArea(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestPolicyAreas400(): NonNullable<FindCommunityBoardBudgetRequestPolicyAreas400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestPolicyAreas500(): NonNullable<FindCommunityBoardBudgetRequestPolicyAreas500> {
  return createError();
}

/**
 * @description An object containing a list of policy areas
 */
export function createFindCommunityBoardBudgetRequestPolicyAreasQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestPolicyAreasQueryResponse> {
  return {
    cbbrPolicyAreas: faker.helpers.arrayElements([
      createCommunityBoardBudgetRequestPolicyArea(),
    ]) as any,
  };
}
