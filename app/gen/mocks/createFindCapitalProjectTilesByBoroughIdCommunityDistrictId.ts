import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createError } from "./createError";
import type {
  FindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams,
  FindCapitalProjectTilesByBoroughIdCommunityDistrictId200,
  FindCapitalProjectTilesByBoroughIdCommunityDistrictId400,
  FindCapitalProjectTilesByBoroughIdCommunityDistrictId500,
  FindCapitalProjectTilesByBoroughIdCommunityDistrictIdQueryResponse,
} from "../types/FindCapitalProjectTilesByBoroughIdCommunityDistrictId";

export function createFindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams(): NonNullable<FindCapitalProjectTilesByBoroughIdCommunityDistrictIdPathParams> {
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
export function createFindCapitalProjectTilesByBoroughIdCommunityDistrictId200(): NonNullable<FindCapitalProjectTilesByBoroughIdCommunityDistrictId200> {
  return faker.string.alpha();
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjectTilesByBoroughIdCommunityDistrictId400(): NonNullable<FindCapitalProjectTilesByBoroughIdCommunityDistrictId400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjectTilesByBoroughIdCommunityDistrictId500(): NonNullable<FindCapitalProjectTilesByBoroughIdCommunityDistrictId500> {
  return createError();
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCapitalProjectTilesByBoroughIdCommunityDistrictIdQueryResponse(): NonNullable<FindCapitalProjectTilesByBoroughIdCommunityDistrictIdQueryResponse> {
  return faker.string.alpha();
}
