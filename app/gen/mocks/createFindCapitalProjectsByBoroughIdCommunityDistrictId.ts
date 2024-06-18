import { faker } from "@faker-js/faker";
import { createCapitalProjectPage } from "./createCapitalProjectPage";
import { createError } from "./createError";
import type {
  FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryParams,
  FindCapitalProjectsByBoroughIdCommunityDistrictId200,
  FindCapitalProjectsByBoroughIdCommunityDistrictId400,
  FindCapitalProjectsByBoroughIdCommunityDistrictId404,
  FindCapitalProjectsByBoroughIdCommunityDistrictId500,
  FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse,
} from "../types/FindCapitalProjectsByBoroughIdCommunityDistrictId";

export function createFindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams(): NonNullable<FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams> {
  return {
    boroughId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      faker.helpers.fromRegExp(new RegExp("^([0-9]{1})$")),
    ]),
    communityDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      faker.helpers.fromRegExp(new RegExp("^([0-9]{2})$")),
    ]),
  };
}

export function createFindCapitalProjectsByBoroughIdCommunityDistrictIdQueryParams(): NonNullable<FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryParams> {
  return { limit: faker.number.int(), offset: faker.number.int() };
}

/**
 * @description An object containing pagination metadata and an array of capital projects for the community district
 */
export function createFindCapitalProjectsByBoroughIdCommunityDistrictId200(): NonNullable<FindCapitalProjectsByBoroughIdCommunityDistrictId200> {
  return createCapitalProjectPage();
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjectsByBoroughIdCommunityDistrictId400(): NonNullable<FindCapitalProjectsByBoroughIdCommunityDistrictId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCapitalProjectsByBoroughIdCommunityDistrictId404(): NonNullable<FindCapitalProjectsByBoroughIdCommunityDistrictId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjectsByBoroughIdCommunityDistrictId500(): NonNullable<FindCapitalProjectsByBoroughIdCommunityDistrictId500> {
  return createError();
}

/**
 * @description An object containing pagination metadata and an array of capital projects for the community district
 */
export function createFindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse(): NonNullable<FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse> {
  return createCapitalProjectPage();
}
