import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityBoardBudgetRequestNeedGroup } from "./createCommunityBoardBudgetRequestNeedGroup";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestNeedGroupsQueryParams,
  FindCommunityBoardBudgetRequestNeedGroups200,
  FindCommunityBoardBudgetRequestNeedGroups400,
  FindCommunityBoardBudgetRequestNeedGroups500,
  FindCommunityBoardBudgetRequestNeedGroupsQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestNeedGroups";

export function createFindCommunityBoardBudgetRequestNeedGroupsQueryParams(): NonNullable<FindCommunityBoardBudgetRequestNeedGroupsQueryParams> {
  return {
    cbbrPolicyAreaId: faker.number.int(),
    agencyInitials: faker.string.alpha(),
  };
}

/**
 * @description An object containing a list of need groups
 */
export function createFindCommunityBoardBudgetRequestNeedGroups200(): NonNullable<FindCommunityBoardBudgetRequestNeedGroups200> {
  return {
    cbbrNeedGroups: faker.helpers.arrayElements([
      createCommunityBoardBudgetRequestNeedGroup(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestNeedGroups400(): NonNullable<FindCommunityBoardBudgetRequestNeedGroups400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestNeedGroups500(): NonNullable<FindCommunityBoardBudgetRequestNeedGroups500> {
  return createError();
}

/**
 * @description An object containing a list of need groups
 */
export function createFindCommunityBoardBudgetRequestNeedGroupsQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestNeedGroupsQueryResponse> {
  return {
    cbbrNeedGroups: faker.helpers.arrayElements([
      createCommunityBoardBudgetRequestNeedGroup(),
    ]) as any,
  };
}
