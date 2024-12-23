import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCityCouncilDistrict } from "./createCityCouncilDistrict";
import { createError } from "./createError";
import type {
  FindCityCouncilDistricts200,
  FindCityCouncilDistricts400,
  FindCityCouncilDistricts500,
  FindCityCouncilDistrictsQueryResponse,
} from "../types/FindCityCouncilDistricts";

/**
 * @description an object of city council districts
 */
export function createFindCityCouncilDistricts200(): NonNullable<FindCityCouncilDistricts200> {
  return {
    cityCouncilDistricts: faker.helpers.arrayElements([
      createCityCouncilDistrict(),
    ]) as any,
    order: faker.string.alpha(),
  };
}

/**
 * @description Invalid client request
 */
export function createFindCityCouncilDistricts400(): NonNullable<FindCityCouncilDistricts400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCityCouncilDistricts500(): NonNullable<FindCityCouncilDistricts500> {
  return createError();
}

/**
 * @description an object of city council districts
 */
export function createFindCityCouncilDistrictsQueryResponse(): NonNullable<FindCityCouncilDistrictsQueryResponse> {
  return {
    cityCouncilDistricts: faker.helpers.arrayElements([
      createCityCouncilDistrict(),
    ]) as any,
    order: faker.string.alpha(),
  };
}
