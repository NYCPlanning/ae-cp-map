import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityDistrict } from "./createCommunityDistrict";
import { createError } from "./createError";
import type {
  FindCommunityDistrictsByBoroughIdPathParams,
  FindCommunityDistrictsByBoroughId200,
  FindCommunityDistrictsByBoroughId400,
  FindCommunityDistrictsByBoroughId404,
  FindCommunityDistrictsByBoroughId500,
  FindCommunityDistrictsByBoroughIdQueryResponse,
} from "../types/FindCommunityDistrictsByBoroughId";

export function createFindCommunityDistrictsByBoroughIdPathParams(): NonNullable<FindCommunityDistrictsByBoroughIdPathParams> {
  return {
    boroughId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{1})$").gen(),
    ]),
  };
}

/**
 * @description An object of community district schemas for the borough
 */
export function createFindCommunityDistrictsByBoroughId200(): NonNullable<FindCommunityDistrictsByBoroughId200> {
  return {
    communityDistricts: faker.helpers.arrayElements([
      createCommunityDistrict(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindCommunityDistrictsByBoroughId400(): NonNullable<FindCommunityDistrictsByBoroughId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCommunityDistrictsByBoroughId404(): NonNullable<FindCommunityDistrictsByBoroughId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityDistrictsByBoroughId500(): NonNullable<FindCommunityDistrictsByBoroughId500> {
  return createError();
}

/**
 * @description An object of community district schemas for the borough
 */
export function createFindCommunityDistrictsByBoroughIdQueryResponse(): NonNullable<FindCommunityDistrictsByBoroughIdQueryResponse> {
  return {
    communityDistricts: faker.helpers.arrayElements([
      createCommunityDistrict(),
    ]) as any,
  };
}
