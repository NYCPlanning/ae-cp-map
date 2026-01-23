import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestsCsvQueryParams,
  FindCommunityBoardBudgetRequestsCsv200,
  FindCommunityBoardBudgetRequestsCsv400,
  FindCommunityBoardBudgetRequestsCsv500,
  FindCommunityBoardBudgetRequestsCsvQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestsCsv";

export function createFindCommunityBoardBudgetRequestsCsvQueryParams(): NonNullable<FindCommunityBoardBudgetRequestsCsvQueryParams> {
  return {
    communityDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{3})$").gen(),
    ]),
    cityCouncilDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{1,2})$").gen(),
    ]),
    cbbrPolicyAreaId: faker.number.int(),
    cbbrNeedGroupId: faker.number.int(),
    agencyInitials: faker.string.alpha(),
    cbbrType: faker.helpers.arrayElement<any>(["C", "E"]),
    cbbrAgencyCategoryResponseIds: faker.helpers.arrayElements([
      faker.number.int(),
    ]) as any,
    isMapped: faker.datatype.boolean(),
    isContinuedSupport: faker.datatype.boolean(),
  };
}

/**
 * @description A CSV download of community board budget requests
 */
export function createFindCommunityBoardBudgetRequestsCsv200(): NonNullable<FindCommunityBoardBudgetRequestsCsv200> {
  return faker.string.alpha();
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestsCsv400(): NonNullable<FindCommunityBoardBudgetRequestsCsv400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestsCsv500(): NonNullable<FindCommunityBoardBudgetRequestsCsv500> {
  return createError();
}

/**
 * @description A CSV download of community board budget requests
 */
export function createFindCommunityBoardBudgetRequestsCsvQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestsCsvQueryResponse> {
  return faker.string.alpha();
}
