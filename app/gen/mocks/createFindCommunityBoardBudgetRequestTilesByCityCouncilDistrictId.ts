import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createError } from "./createError";
import type {
  FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdPathParams,
  FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId200,
  FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId400,
  FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId500,
  FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdQueryResponse,
} from "../types/FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId";

export function createFindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdPathParams(): NonNullable<FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdPathParams> {
  return {
    cityCouncilDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{1,2})$").gen(),
    ]),
    z: faker.number.int(),
    x: faker.number.int(),
    y: faker.number.int(),
  };
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId200(): NonNullable<FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId200> {
  return faker.string.alpha();
}

/**
 * @description Invalid client request
 */
export function createFindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId400(): NonNullable<FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId500(): NonNullable<FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictId500> {
  return createError();
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdQueryResponse(): NonNullable<FindCommunityBoardBudgetRequestTilesByCityCouncilDistrictIdQueryResponse> {
  return faker.string.alpha();
}
