import { faker } from "@faker-js/faker";
import { createError } from "./createError";
import type {
  FindCommunityDistrictTilesPathParams,
  FindCommunityDistrictTiles200,
  FindCommunityDistrictTiles400,
  FindCommunityDistrictTiles500,
  FindCommunityDistrictTilesQueryResponse,
} from "../types/FindCommunityDistrictTiles";

export function createFindCommunityDistrictTilesPathParams(): NonNullable<FindCommunityDistrictTilesPathParams> {
  return {
    z: faker.number.int(),
    x: faker.number.int(),
    y: faker.number.int(),
  };
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCommunityDistrictTiles200(): NonNullable<FindCommunityDistrictTiles200> {
  return faker.image.imageUrl() as unknown as Blob;
}

/**
 * @description Invalid client request
 */
export function createFindCommunityDistrictTiles400(): NonNullable<FindCommunityDistrictTiles400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityDistrictTiles500(): NonNullable<FindCommunityDistrictTiles500> {
  return createError();
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCommunityDistrictTilesQueryResponse(): NonNullable<FindCommunityDistrictTilesQueryResponse> {
  return faker.image.imageUrl() as unknown as Blob;
}
