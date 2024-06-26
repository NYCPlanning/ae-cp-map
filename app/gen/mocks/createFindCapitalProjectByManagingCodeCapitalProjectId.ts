import { faker } from "@faker-js/faker";
import { createCapitalProjectBudgeted } from "./createCapitalProjectBudgeted";
import { createError } from "./createError";
import type {
  FindCapitalProjectByManagingCodeCapitalProjectIdPathParams,
  FindCapitalProjectByManagingCodeCapitalProjectId200,
  FindCapitalProjectByManagingCodeCapitalProjectId400,
  FindCapitalProjectByManagingCodeCapitalProjectId404,
  FindCapitalProjectByManagingCodeCapitalProjectId500,
  FindCapitalProjectByManagingCodeCapitalProjectIdQueryResponse,
} from "../types/FindCapitalProjectByManagingCodeCapitalProjectId";

export function createFindCapitalProjectByManagingCodeCapitalProjectIdPathParams(): NonNullable<FindCapitalProjectByManagingCodeCapitalProjectIdPathParams> {
  return {
    managingCode: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      faker.helpers.fromRegExp(new RegExp("^([0-9]{3})$")),
    ]),
    capitalProjectId: faker.string.alpha(),
  };
}

/**
 * @description An object of capital project details
 */
export function createFindCapitalProjectByManagingCodeCapitalProjectId200(): NonNullable<FindCapitalProjectByManagingCodeCapitalProjectId200> {
  return createCapitalProjectBudgeted();
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjectByManagingCodeCapitalProjectId400(): NonNullable<FindCapitalProjectByManagingCodeCapitalProjectId400> {
  return createError();
}

/**
 * @description Requested resource does not exist or is not available
 */
export function createFindCapitalProjectByManagingCodeCapitalProjectId404(): NonNullable<FindCapitalProjectByManagingCodeCapitalProjectId404> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjectByManagingCodeCapitalProjectId500(): NonNullable<FindCapitalProjectByManagingCodeCapitalProjectId500> {
  return createError();
}

/**
 * @description An object of capital project details
 */
export function createFindCapitalProjectByManagingCodeCapitalProjectIdQueryResponse(): NonNullable<FindCapitalProjectByManagingCodeCapitalProjectIdQueryResponse> {
  return createCapitalProjectBudgeted();
}
