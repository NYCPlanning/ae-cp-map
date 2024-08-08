import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCityCouncilDistrictGeoJson } from "./createCityCouncilDistrictGeoJson";
import { createError } from "./createError";
import type {
  FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdPathParams,
  FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId200,
  FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId400,
  FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId404,
  FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId500,
  FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdQueryResponse,
} from "../types/FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId";

export function createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdPathParams(): NonNullable<FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdPathParams> {
  return {
    cityCouncilDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{1,2})$").gen(),
    ]),
  };
}

/**
 * @description a city council district geojson object
 */
export function createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictId200(): NonNullable<FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId200> {
  return createCityCouncilDistrictGeoJson();
}

/**
 * @description Invalid client request
 */
export function createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictId400(): NonNullable<FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictId404(): NonNullable<FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictId500(): NonNullable<FindCityCouncilDistrictGeoJsonByCityCouncilDistrictId500> {
  return createError();
}

/**
 * @description a city council district geojson object
 */
export function createFindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdQueryResponse(): NonNullable<FindCityCouncilDistrictGeoJsonByCityCouncilDistrictIdQueryResponse> {
  return createCityCouncilDistrictGeoJson();
}
