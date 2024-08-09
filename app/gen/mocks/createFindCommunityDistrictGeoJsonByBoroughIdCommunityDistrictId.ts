import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCommunityDistrictGeoJson } from "./createCommunityDistrictGeoJson";
import { createError } from "./createError";
import type {
  FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdPathParams,
  FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId200,
  FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId400,
  FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId404,
  FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId500,
  FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdQueryResponse,
} from "../types/FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId";

export function createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdPathParams(): NonNullable<FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdPathParams> {
  return {
    boroughId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{1})$").gen(),
    ]),
    communityDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{2})$").gen(),
    ]),
  };
}

/**
 * @description a community district geojson object
 */
export function createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId200(): NonNullable<FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId200> {
  return createCommunityDistrictGeoJson();
}

/**
 * @description Invalid client request
 */
export function createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId400(): NonNullable<FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId404(): NonNullable<FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId500(): NonNullable<FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictId500> {
  return createError();
}

/**
 * @description a community district geojson object
 */
export function createFindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdQueryResponse(): NonNullable<FindCommunityDistrictGeoJsonByBoroughIdCommunityDistrictIdQueryResponse> {
  return createCommunityDistrictGeoJson();
}
