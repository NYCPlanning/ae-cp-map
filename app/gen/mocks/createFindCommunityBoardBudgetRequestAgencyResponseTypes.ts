import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityBoardBudgetRequestAgencyResponseType } from "./createCommunityBoardBudgetRequestAgencyResponseType";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestAgencyResponseTypes200,
  FindCommunityBoardBudgetRequestAgencyResponseTypes400,
  FindCommunityBoardBudgetRequestAgencyResponseTypes500,
  FindCommunityBoardBudgetRequestAgencyResponseTypesQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestAgencyResponseTypes";

/**
 * @description An object containing a list of agency reponse types
 */
export function createFindCommunityBoardBudgetRequestAgencyResponseTypes200(): NonNullable<FindCommunityBoardBudgetRequestAgencyResponseTypes200> {
  return {
    cbbrAgencyResponseTypes: faker.helpers.arrayElements([
      createCommunityBoardBudgetRequestAgencyResponseType(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestAgencyResponseTypes400(): NonNullable<FindCommunityBoardBudgetRequestAgencyResponseTypes400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestAgencyResponseTypes500(): NonNullable<FindCommunityBoardBudgetRequestAgencyResponseTypes500> {
  return createError();
}

/**
 * @description An object containing a list of agency reponse types
 */
export function createFindCommunityBoardBudgetRequestAgencyResponseTypesQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestAgencyResponseTypesQueryResponse> {
  return {
    cbbrAgencyResponseTypes: faker.helpers.arrayElements([
      createCommunityBoardBudgetRequestAgencyResponseType(),
    ]) as any,
  };
}
