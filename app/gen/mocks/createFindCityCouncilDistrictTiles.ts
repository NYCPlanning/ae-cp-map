import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createError } from "./createError";
import type {
  FindCityCouncilDistrictTilesPathParams,
  FindCityCouncilDistrictTiles200,
  FindCityCouncilDistrictTiles400,
  FindCityCouncilDistrictTiles500,
  FindCityCouncilDistrictTilesQueryResponse,
} from "../types/FindCityCouncilDistrictTiles";

export function createFindCityCouncilDistrictTilesPathParams(): NonNullable<FindCityCouncilDistrictTilesPathParams> {
  return {
    z: faker.number.int(),
    x: faker.number.int(),
    y: faker.number.int(),
  };
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCityCouncilDistrictTiles200(): NonNullable<FindCityCouncilDistrictTiles200> {
  return faker.string.alpha();
}

/**
 * @description Invalid client request
 */
export function createFindCityCouncilDistrictTiles400(): NonNullable<FindCityCouncilDistrictTiles400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCityCouncilDistrictTiles500(): NonNullable<FindCityCouncilDistrictTiles500> {
  return createError();
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCityCouncilDistrictTilesQueryResponse(): NonNullable<FindCityCouncilDistrictTilesQueryResponse> {
  return faker.string.alpha();
}
