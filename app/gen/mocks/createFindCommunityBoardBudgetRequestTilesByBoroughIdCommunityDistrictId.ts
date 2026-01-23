import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams,
  FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId200,
  FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId400,
  FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId500,
  FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId";

export function createFindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams(): NonNullable<FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdPathParams> {
  return {
    boroughId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{1})$").gen(),
    ]),
    communityDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{2})$").gen(),
    ]),
    z: faker.number.int(),
    x: faker.number.int(),
    y: faker.number.int(),
  };
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId200(): NonNullable<FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId200> {
  return faker.string.alpha();
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId400(): NonNullable<FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId500(): NonNullable<FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictId500> {
  return createError();
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestTilesByBoroughIdCommunityDistrictIdQueryResponse> {
  return faker.string.alpha();
}
