import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createAgency } from "./createAgency";
import { createError } from "./createError";
import type {
  FindAgencies200,
  FindAgencies400,
  FindAgencies500,
  FindAgenciesQueryResponse,
} from "../types/FindAgencies";

/**
 * @description An object containing all agencies.
 */
export function createFindAgencies200(): NonNullable<FindAgencies200> {
  return { agencies: faker.helpers.arrayElements([createAgency()]) as any };
}

/**
 * @description Invalid client request
 */
export function createFindAgencies400(): NonNullable<FindAgencies400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindAgencies500(): NonNullable<FindAgencies500> {
  return createError();
}

/**
 * @description An object containing all agencies.
 */
export function createFindAgenciesQueryResponse(): NonNullable<FindAgenciesQueryResponse> {
  return { agencies: faker.helpers.arrayElements([createAgency()]) as any };
}
