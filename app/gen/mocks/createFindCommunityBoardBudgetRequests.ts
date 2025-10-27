import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityBoardBudgetRequestPage } from "./createCommunityBoardBudgetRequestPage";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestsQueryParams,
  FindCommunityBoardBudgetRequests200,
  FindCommunityBoardBudgetRequests400,
  FindCommunityBoardBudgetRequests500,
  FindCommunityBoardBudgetRequestsQueryResponse,
} from "../types/FindCommunityBoardBudgetRequests";

export function createFindCommunityBoardBudgetRequestsQueryParams(): NonNullable<FindCommunityBoardBudgetRequestsQueryParams> {
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
    limit: faker.number.int(),
    offset: faker.number.int(),
  };
}

/**
 * @description An object containing pagination metadata and an array of community board budget requests
 */
export function createFindCommunityBoardBudgetRequests200(): NonNullable<FindCommunityBoardBudgetRequests200> {
  return createCommunityBoardBudgetRequestPage();
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequests400(): NonNullable<FindCommunityBoardBudgetRequests400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequests500(): NonNullable<FindCommunityBoardBudgetRequests500> {
  return createError();
}

/**
 * @description An object containing pagination metadata and an array of community board budget requests
 */
export function createFindCommunityBoardBudgetRequestsQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestsQueryResponse> {
  return createCommunityBoardBudgetRequestPage();
}
