import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityBoardBudgetRequestGeoJson } from "./createCommunityBoardBudgetRequestGeoJson";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestGeoJsonByIdPathParams,
  FindCommunityBoardBudgetRequestGeoJsonById200,
  FindCommunityBoardBudgetRequestGeoJsonById400,
  FindCommunityBoardBudgetRequestGeoJsonById404,
  FindCommunityBoardBudgetRequestGeoJsonById500,
  FindCommunityBoardBudgetRequestGeoJsonByIdQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestGeoJsonById";

export function createFindCommunityBoardBudgetRequestGeoJsonByIdPathParams(): NonNullable<FindCommunityBoardBudgetRequestGeoJsonByIdPathParams> {
  return { cbbrId: faker.string.alpha() };
}

/**
 * @description A geojson object of community board budget request details
 */
export function createFindCommunityBoardBudgetRequestGeoJsonById200(): NonNullable<FindCommunityBoardBudgetRequestGeoJsonById200> {
  return createCommunityBoardBudgetRequestGeoJson();
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestGeoJsonById400(): NonNullable<FindCommunityBoardBudgetRequestGeoJsonById400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCommunityBoardBudgetRequestGeoJsonById404(): NonNullable<FindCommunityBoardBudgetRequestGeoJsonById404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestGeoJsonById500(): NonNullable<FindCommunityBoardBudgetRequestGeoJsonById500> {
  return createError();
}

/**
 * @description A geojson object of community board budget request details
 */
export function createFindCommunityBoardBudgetRequestGeoJsonByIdQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestGeoJsonByIdQueryResponse> {
  return createCommunityBoardBudgetRequestGeoJson();
}
