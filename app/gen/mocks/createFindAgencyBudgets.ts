import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createAgencyBudget } from "./createAgencyBudget";
import { createError } from "./createError";
import type {
  FindAgencyBudgets200,
  FindAgencyBudgets400,
  FindAgencyBudgets500,
  FindAgencyBudgetsQueryResponse,
} from "../types/FindAgencyBudgets";

/**
 * @description An object containing all agency budgets.
 */
export function createFindAgencyBudgets200(): NonNullable<FindAgencyBudgets200> {
  return {
    agencyBudgets: faker.helpers.arrayElements([createAgencyBudget()]) as any,
    order: faker.string.alpha(),
  };
}

/**
 * @description Invalid client request
 */
export function createFindAgencyBudgets400(): NonNullable<FindAgencyBudgets400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindAgencyBudgets500(): NonNullable<FindAgencyBudgets500> {
  return createError();
}

/**
 * @description An object containing all agency budgets.
 */
export function createFindAgencyBudgetsQueryResponse(): NonNullable<FindAgencyBudgetsQueryResponse> {
  return {
    agencyBudgets: faker.helpers.arrayElements([createAgencyBudget()]) as any,
    order: faker.string.alpha(),
  };
}
