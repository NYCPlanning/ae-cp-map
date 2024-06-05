import { faker } from "@faker-js/faker";
import { createError } from "./createError";
import type {
  FindCapitalProjectTilesPathParams,
  FindCapitalProjectTiles200,
  FindCapitalProjectTiles400,
  FindCapitalProjectTiles500,
  FindCapitalProjectTilesQueryResponse,
} from "../types/FindCapitalProjectTiles";

export function createFindCapitalProjectTilesPathParams(): NonNullable<FindCapitalProjectTilesPathParams> {
  return {
    z: faker.number.int(),
    x: faker.number.int(),
    y: faker.number.int(),
  };
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCapitalProjectTiles200(): NonNullable<FindCapitalProjectTiles200> {
  return faker.image.imageUrl() as unknown as Blob;
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjectTiles400(): NonNullable<FindCapitalProjectTiles400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjectTiles500(): NonNullable<FindCapitalProjectTiles500> {
  return createError();
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCapitalProjectTilesQueryResponse(): NonNullable<FindCapitalProjectTilesQueryResponse> {
  return faker.image.imageUrl() as unknown as Blob;
}
