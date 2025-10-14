import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createAgency } from "./createAgency";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestAgenciesQueryParams,
  FindCommunityBoardBudgetRequestAgencies200,
  FindCommunityBoardBudgetRequestAgencies400,
  FindCommunityBoardBudgetRequestAgencies500,
  FindCommunityBoardBudgetRequestAgenciesQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestAgencies";

export function createFindCommunityBoardBudgetRequestAgenciesQueryParams(): NonNullable<FindCommunityBoardBudgetRequestAgenciesQueryParams> {
  return {
    cbbrNeedGroupId: faker.number.int(),
    cbbrPolicyAreaId: faker.number.int(),
  };
}

/**
 * @description An object containing a list of agencies
 */
export function createFindCommunityBoardBudgetRequestAgencies200(): NonNullable<FindCommunityBoardBudgetRequestAgencies200> {
  return { cbbrAgencies: faker.helpers.arrayElements([createAgency()]) as any };
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestAgencies400(): NonNullable<FindCommunityBoardBudgetRequestAgencies400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestAgencies500(): NonNullable<FindCommunityBoardBudgetRequestAgencies500> {
  return createError();
}

/**
 * @description An object containing a list of agencies
 */
export function createFindCommunityBoardBudgetRequestAgenciesQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestAgenciesQueryResponse> {
  return { cbbrAgencies: faker.helpers.arrayElements([createAgency()]) as any };
}
