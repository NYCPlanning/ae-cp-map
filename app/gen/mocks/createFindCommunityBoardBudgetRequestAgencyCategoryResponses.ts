import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityBoardBudgetRequestAgencyCategoryResponse } from "./createCommunityBoardBudgetRequestAgencyCategoryResponse";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestAgencyCategoryResponses200,
  FindCommunityBoardBudgetRequestAgencyCategoryResponses400,
  FindCommunityBoardBudgetRequestAgencyCategoryResponses500,
  FindCommunityBoardBudgetRequestAgencyCategoryResponsesQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestAgencyCategoryResponses";

/**
 * @description An object containing a list of agency reponse categories
 */
export function createFindCommunityBoardBudgetRequestAgencyCategoryResponses200(): NonNullable<FindCommunityBoardBudgetRequestAgencyCategoryResponses200> {
  return {
    cbbrAgencyCategoryResponses: faker.helpers.arrayElements([
      createCommunityBoardBudgetRequestAgencyCategoryResponse(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestAgencyCategoryResponses400(): NonNullable<FindCommunityBoardBudgetRequestAgencyCategoryResponses400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestAgencyCategoryResponses500(): NonNullable<FindCommunityBoardBudgetRequestAgencyCategoryResponses500> {
  return createError();
}

/**
 * @description An object containing a list of agency reponse categories
 */
export function createFindCommunityBoardBudgetRequestAgencyCategoryResponsesQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestAgencyCategoryResponsesQueryResponse> {
  return {
    cbbrAgencyCategoryResponses: faker.helpers.arrayElements([
      createCommunityBoardBudgetRequestAgencyCategoryResponse(),
    ]) as any,
  };
}
