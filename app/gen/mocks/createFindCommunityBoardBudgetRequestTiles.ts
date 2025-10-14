import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestTilesPathParams,
  FindCommunityBoardBudgetRequestTiles200,
  FindCommunityBoardBudgetRequestTiles400,
  FindCommunityBoardBudgetRequestTiles500,
  FindCommunityBoardBudgetRequestTilesQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestTiles";

export function createFindCommunityBoardBudgetRequestTilesPathParams(): NonNullable<FindCommunityBoardBudgetRequestTilesPathParams> {
  return {
    z: faker.number.int(),
    x: faker.number.int(),
    y: faker.number.int(),
  };
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCommunityBoardBudgetRequestTiles200(): NonNullable<FindCommunityBoardBudgetRequestTiles200> {
  return faker.string.alpha();
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestTiles400(): NonNullable<FindCommunityBoardBudgetRequestTiles400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestTiles500(): NonNullable<FindCommunityBoardBudgetRequestTiles500> {
  return createError();
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCommunityBoardBudgetRequestTilesQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestTilesQueryResponse> {
  return faker.string.alpha();
}
