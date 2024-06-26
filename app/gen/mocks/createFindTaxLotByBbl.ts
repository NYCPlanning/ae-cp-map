import { faker } from "@faker-js/faker";
import { createTaxLot } from "./createTaxLot";
import { createError } from "./createError";
import type {
  FindTaxLotByBblPathParams,
  FindTaxLotByBbl200,
  FindTaxLotByBbl400,
  FindTaxLotByBbl404,
  FindTaxLotByBbl500,
  FindTaxLotByBblQueryResponse,
} from "../types/FindTaxLotByBbl";

export function createFindTaxLotByBblPathParams(): NonNullable<FindTaxLotByBblPathParams> {
  return {
    bbl: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      faker.helpers.fromRegExp(new RegExp("^([0-9]{10})$")),
    ]),
  };
}

/**
 * @description A tax lot object
 */
export function createFindTaxLotByBbl200(): NonNullable<FindTaxLotByBbl200> {
  return createTaxLot();
}

/**
 * @description Invalid client request
 */
export function createFindTaxLotByBbl400(): NonNullable<FindTaxLotByBbl400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindTaxLotByBbl404(): NonNullable<FindTaxLotByBbl404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindTaxLotByBbl500(): NonNullable<FindTaxLotByBbl500> {
  return createError();
}

/**
 * @description A tax lot object
 */
export function createFindTaxLotByBblQueryResponse(): NonNullable<FindTaxLotByBblQueryResponse> {
  return createTaxLot();
}
