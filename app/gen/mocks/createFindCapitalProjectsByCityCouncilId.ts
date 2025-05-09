import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCapitalProjectPage } from "./createCapitalProjectPage";
import { createError } from "./createError";
import type {
  FindCapitalProjectsByCityCouncilIdPathParams,
  FindCapitalProjectsByCityCouncilIdQueryParams,
  FindCapitalProjectsByCityCouncilId200,
  FindCapitalProjectsByCityCouncilId400,
  FindCapitalProjectsByCityCouncilId500,
  FindCapitalProjectsByCityCouncilIdQueryResponse,
} from "../types/FindCapitalProjectsByCityCouncilId";

export function createFindCapitalProjectsByCityCouncilIdPathParams(): NonNullable<FindCapitalProjectsByCityCouncilIdPathParams> {
  return {
    cityCouncilDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{1,2})$").gen(),
    ]),
  };
}

export function createFindCapitalProjectsByCityCouncilIdQueryParams(): NonNullable<FindCapitalProjectsByCityCouncilIdQueryParams> {
  return { limit: faker.number.int(), offset: faker.number.int() };
}

/**
 * @description An object containing pagination metadata and an array of capital projects for the city council district
 */
export function createFindCapitalProjectsByCityCouncilId200(): NonNullable<FindCapitalProjectsByCityCouncilId200> {
  return createCapitalProjectPage();
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjectsByCityCouncilId400(): NonNullable<FindCapitalProjectsByCityCouncilId400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjectsByCityCouncilId500(): NonNullable<FindCapitalProjectsByCityCouncilId500> {
  return createError();
}

/**
 * @description An object containing pagination metadata and an array of capital projects for the city council district
 */
export function createFindCapitalProjectsByCityCouncilIdQueryResponse(): NonNullable<FindCapitalProjectsByCityCouncilIdQueryResponse> {
  return createCapitalProjectPage();
}
