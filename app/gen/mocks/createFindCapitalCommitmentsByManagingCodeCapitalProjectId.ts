import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCapitalCommitment } from "./createCapitalCommitment";
import { createError } from "./createError";
import type {
  FindCapitalCommitmentsByManagingCodeCapitalProjectIdPathParams,
  FindCapitalCommitmentsByManagingCodeCapitalProjectId200,
  FindCapitalCommitmentsByManagingCodeCapitalProjectId400,
  FindCapitalCommitmentsByManagingCodeCapitalProjectId404,
  FindCapitalCommitmentsByManagingCodeCapitalProjectId500,
  FindCapitalCommitmentsByManagingCodeCapitalProjectIdQueryResponse,
} from "../types/FindCapitalCommitmentsByManagingCodeCapitalProjectId";

export function createFindCapitalCommitmentsByManagingCodeCapitalProjectIdPathParams(): NonNullable<FindCapitalCommitmentsByManagingCodeCapitalProjectIdPathParams> {
  return {
    managingCode: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{3})$").gen(),
    ]),
    capitalProjectId: faker.string.alpha(),
  };
}

/**
 * @description an object of capital commitments for the capital project
 */
export function createFindCapitalCommitmentsByManagingCodeCapitalProjectId200(): NonNullable<FindCapitalCommitmentsByManagingCodeCapitalProjectId200> {
  return {
    capitalCommitments: faker.helpers.arrayElements([
      createCapitalCommitment(),
    ]) as any,
    order: faker.string.alpha(),
  };
}

/**
 * @description Invalid client request
 */
export function createFindCapitalCommitmentsByManagingCodeCapitalProjectId400(): NonNullable<FindCapitalCommitmentsByManagingCodeCapitalProjectId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCapitalCommitmentsByManagingCodeCapitalProjectId404(): NonNullable<FindCapitalCommitmentsByManagingCodeCapitalProjectId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalCommitmentsByManagingCodeCapitalProjectId500(): NonNullable<FindCapitalCommitmentsByManagingCodeCapitalProjectId500> {
  return createError();
}

/**
 * @description an object of capital commitments for the capital project
 */
export function createFindCapitalCommitmentsByManagingCodeCapitalProjectIdQueryResponse(): NonNullable<FindCapitalCommitmentsByManagingCodeCapitalProjectIdQueryResponse> {
  return {
    capitalCommitments: faker.helpers.arrayElements([
      createCapitalCommitment(),
    ]) as any,
    order: faker.string.alpha(),
  };
}
