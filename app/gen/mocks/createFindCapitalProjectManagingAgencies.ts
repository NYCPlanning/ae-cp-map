import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createAgency } from "./createAgency";
import { createError } from "./createError";
import type {
  FindCapitalProjectManagingAgencies200,
  FindCapitalProjectManagingAgencies400,
  FindCapitalProjectManagingAgencies500,
  FindCapitalProjectManagingAgenciesQueryResponse,
} from "../types/FindCapitalProjectManagingAgencies";

/**
 * @description An object containing capital project managing agencies\n
 */
export function createFindCapitalProjectManagingAgencies200(): NonNullable<FindCapitalProjectManagingAgencies200> {
  return {
    managingAgencies: faker.helpers.arrayElements([createAgency()]) as any,
    order: faker.string.alpha(),
  };
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjectManagingAgencies400(): NonNullable<FindCapitalProjectManagingAgencies400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjectManagingAgencies500(): NonNullable<FindCapitalProjectManagingAgencies500> {
  return createError();
}

/**
 * @description An object containing capital project managing agencies\n
 */
export function createFindCapitalProjectManagingAgenciesQueryResponse(): NonNullable<FindCapitalProjectManagingAgenciesQueryResponse> {
  return {
    managingAgencies: faker.helpers.arrayElements([createAgency()]) as any,
    order: faker.string.alpha(),
  };
}
