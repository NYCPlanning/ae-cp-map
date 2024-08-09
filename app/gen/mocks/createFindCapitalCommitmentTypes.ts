import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCapitalCommitmentType } from "./createCapitalCommitmentType";
import { createError } from "./createError";
import type {
  FindCapitalCommitmentTypes200,
  FindCapitalCommitmentTypes400,
  FindCapitalCommitmentTypes500,
  FindCapitalCommitmentTypesQueryResponse,
} from "../types/FindCapitalCommitmentTypes";

/**
 * @description An object containing all capital commitment types.
 */
export function createFindCapitalCommitmentTypes200(): NonNullable<FindCapitalCommitmentTypes200> {
  return {
    capitalCommitmentTypes: faker.helpers.arrayElements([
      createCapitalCommitmentType(),
    ]) as any,
  };
}

/**
 * @description Invalid client request
 */
export function createFindCapitalCommitmentTypes400(): NonNullable<FindCapitalCommitmentTypes400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalCommitmentTypes500(): NonNullable<FindCapitalCommitmentTypes500> {
  return createError();
}

/**
 * @description An object containing all capital commitment types.
 */
export function createFindCapitalCommitmentTypesQueryResponse(): NonNullable<FindCapitalCommitmentTypesQueryResponse> {
  return {
    capitalCommitmentTypes: faker.helpers.arrayElements([
      createCapitalCommitmentType(),
    ]) as any,
  };
}
