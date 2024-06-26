import { faker } from "@faker-js/faker";
import { createLandUse } from "./createLandUse";
import { createError } from "./createError";
import type {
  FindLandUses200,
  FindLandUses400,
  FindLandUses500,
  FindLandUsesQueryResponse,
} from "../types/FindLandUses";

/**
 * @description An object containing all land uses.
 */
export function createFindLandUses200(): NonNullable<FindLandUses200> {
  return { landUses: faker.helpers.arrayElements([createLandUse()]) as any };
}

/**
 * @description Invalid client request
 */
export function createFindLandUses400(): NonNullable<FindLandUses400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindLandUses500(): NonNullable<FindLandUses500> {
  return createError();
}

/**
 * @description An object containing all land uses.
 */
export function createFindLandUsesQueryResponse(): NonNullable<FindLandUsesQueryResponse> {
  return { landUses: faker.helpers.arrayElements([createLandUse()]) as any };
}
