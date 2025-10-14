import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityBoardBudgetRequest } from "./createCommunityBoardBudgetRequest";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestByIdPathParams,
  FindCommunityBoardBudgetRequestById200,
  FindCommunityBoardBudgetRequestById400,
  FindCommunityBoardBudgetRequestById404,
  FindCommunityBoardBudgetRequestById500,
  FindCommunityBoardBudgetRequestByIdQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestById";

export function createFindCommunityBoardBudgetRequestByIdPathParams(): NonNullable<FindCommunityBoardBudgetRequestByIdPathParams> {
  return { cbbrId: faker.string.alpha() };
}

/**
 * @description An object of community board budget request details
 */
export function createFindCommunityBoardBudgetRequestById200(): NonNullable<FindCommunityBoardBudgetRequestById200> {
  return createCommunityBoardBudgetRequest();
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestById400(): NonNullable<FindCommunityBoardBudgetRequestById400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCommunityBoardBudgetRequestById404(): NonNullable<FindCommunityBoardBudgetRequestById404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestById500(): NonNullable<FindCommunityBoardBudgetRequestById500> {
  return createError();
}

/**
 * @description An object of community board budget request details
 */
export function createFindCommunityBoardBudgetRequestByIdQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestByIdQueryResponse> {
  return createCommunityBoardBudgetRequest();
}
