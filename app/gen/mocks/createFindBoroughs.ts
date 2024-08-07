import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createBorough } from "./createBorough";
import { createError } from "./createError";
import type {
  FindBoroughs200,
  FindBoroughs400,
  FindBoroughs500,
  FindBoroughsQueryResponse,
} from "../types/FindBoroughs";

/**
 * @description An object containing all boroughs.
 */
export function createFindBoroughs200(): NonNullable<FindBoroughs200> {
  return { boroughs: faker.helpers.arrayElements([createBorough()]) as any };
}

/**
 * @description Invalid client request
 */
export function createFindBoroughs400(): NonNullable<FindBoroughs400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindBoroughs500(): NonNullable<FindBoroughs500> {
  return createError();
}

/**
 * @description An object containing all boroughs.
 */
export function createFindBoroughsQueryResponse(): NonNullable<FindBoroughsQueryResponse> {
  return { boroughs: faker.helpers.arrayElements([createBorough()]) as any };
}
