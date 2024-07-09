import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createTaxLotGeoJson } from "./createTaxLotGeoJson";
import { createError } from "./createError";
import type {
  FindTaxLotGeoJsonByBblPathParams,
  FindTaxLotGeoJsonByBbl200,
  FindTaxLotGeoJsonByBbl400,
  FindTaxLotGeoJsonByBbl404,
  FindTaxLotGeoJsonByBbl500,
  FindTaxLotGeoJsonByBblQueryResponse,
} from "../types/FindTaxLotGeoJsonByBbl";

export function createFindTaxLotGeoJsonByBblPathParams(): NonNullable<FindTaxLotGeoJsonByBblPathParams> {
  return {
    bbl: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{10})$").gen(),
    ]),
  };
}

/**
 * @description A tax lot geojson object
 */
export function createFindTaxLotGeoJsonByBbl200(): NonNullable<FindTaxLotGeoJsonByBbl200> {
  return createTaxLotGeoJson();
}

/**
 * @description Invalid client request
 */
export function createFindTaxLotGeoJsonByBbl400(): NonNullable<FindTaxLotGeoJsonByBbl400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindTaxLotGeoJsonByBbl404(): NonNullable<FindTaxLotGeoJsonByBbl404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindTaxLotGeoJsonByBbl500(): NonNullable<FindTaxLotGeoJsonByBbl500> {
  return createError();
}

/**
 * @description A tax lot geojson object
 */
export function createFindTaxLotGeoJsonByBblQueryResponse(): NonNullable<FindTaxLotGeoJsonByBblQueryResponse> {
  return createTaxLotGeoJson();
}
