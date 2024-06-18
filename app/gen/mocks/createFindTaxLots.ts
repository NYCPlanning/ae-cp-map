import { faker } from "@faker-js/faker";
import { createTaxLotBasicPage } from "./createTaxLotBasicPage";
import { createError } from "./createError";
import type {
  FindTaxLotsQueryParams,
  FindTaxLots200,
  FindTaxLots400,
  FindTaxLots500,
  FindTaxLotsQueryResponse,
} from "../types/FindTaxLots";

export function createFindTaxLotsQueryParams(): NonNullable<FindTaxLotsQueryParams> {
  return {
    limit: faker.number.int(),
    offset: faker.number.int(),
    geometry: faker.helpers.arrayElement<any>([
      "Point",
      "LineString",
      "Polygon",
    ]),
    lons: faker.helpers.arrayElements([faker.number.float()]) as any,
    lats: faker.helpers.arrayElements([faker.number.float()]) as any,
    buffer: faker.number.float(),
  };
}

/**
 * @description An object containing a list of tax lots and pagination metadata. An optional spatial filter will return all tax lots that intersect the spatial feature and its optional buffer. When applying a spatial filter, tax lots are ordered by their closeness to the spatial feature.
 */
export function createFindTaxLots200(): NonNullable<FindTaxLots200> {
  return createTaxLotBasicPage();
}

/**
 * @description Invalid client request
 */
export function createFindTaxLots400(): NonNullable<FindTaxLots400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindTaxLots500(): NonNullable<FindTaxLots500> {
  return createError();
}

/**
 * @description An object containing a list of tax lots and pagination metadata. An optional spatial filter will return all tax lots that intersect the spatial feature and its optional buffer. When applying a spatial filter, tax lots are ordered by their closeness to the spatial feature.
 */
export function createFindTaxLotsQueryResponse(): NonNullable<FindTaxLotsQueryResponse> {
  return createTaxLotBasicPage();
}
