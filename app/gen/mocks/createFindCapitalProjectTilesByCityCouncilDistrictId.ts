import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createError } from "./createError";
import type {
  FindCapitalProjectTilesByCityCouncilDistrictIdPathParams,
  FindCapitalProjectTilesByCityCouncilDistrictId200,
  FindCapitalProjectTilesByCityCouncilDistrictId400,
  FindCapitalProjectTilesByCityCouncilDistrictId500,
  FindCapitalProjectTilesByCityCouncilDistrictIdQueryResponse,
} from "../types/FindCapitalProjectTilesByCityCouncilDistrictId";

export function createFindCapitalProjectTilesByCityCouncilDistrictIdPathParams(): NonNullable<FindCapitalProjectTilesByCityCouncilDistrictIdPathParams> {
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
export function createFindCapitalProjectTilesByCityCouncilDistrictId200(): NonNullable<FindCapitalProjectTilesByCityCouncilDistrictId200> {
  return faker.string.alpha();
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjectTilesByCityCouncilDistrictId400(): NonNullable<FindCapitalProjectTilesByCityCouncilDistrictId400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjectTilesByCityCouncilDistrictId500(): NonNullable<FindCapitalProjectTilesByCityCouncilDistrictId500> {
  return createError();
}

/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export function createFindCapitalProjectTilesByCityCouncilDistrictIdQueryResponse(): NonNullable<FindCapitalProjectTilesByCityCouncilDistrictIdQueryResponse> {
  return faker.string.alpha();
}
