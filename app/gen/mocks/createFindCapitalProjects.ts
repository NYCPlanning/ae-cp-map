import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import { createCapitalProjectPage } from "./createCapitalProjectPage";
import { createError } from "./createError";
import type {
  FindCapitalProjectsQueryParams,
  FindCapitalProjects200,
  FindCapitalProjects400,
  FindCapitalProjects500,
  FindCapitalProjectsQueryResponse,
} from "../types/FindCapitalProjects";

export function createFindCapitalProjectsQueryParams(): NonNullable<FindCapitalProjectsQueryParams> {
  return {
    communityDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{3})$").gen(),
    ]),
    cityCouncilDistrictId: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^([0-9]{1,2})$").gen(),
    ]),
    managingAgency: faker.string.alpha(),
    agencyBudget: faker.string.alpha(),
    commitmentsTotalMin: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\\.[0-9]{2})?$").gen(),
    ]),
    commitmentsTotalMax: faker.helpers.arrayElement<any>([
      faker.string.alpha(),
      new RandExp("^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\\.[0-9]{2})?$").gen(),
    ]),
    limit: faker.number.int(),
    offset: faker.number.int(),
  };
}

/**
 * @description An object containing pagination metadata and an array of capital projects
 */
export function createFindCapitalProjects200(): NonNullable<FindCapitalProjects200> {
  return createCapitalProjectPage();
}

/**
 * @description Invalid client request
 */
export function createFindCapitalProjects400(): NonNullable<FindCapitalProjects400> {
  return createError();
}

/**
 * @description Server side error
 */
export function createFindCapitalProjects500(): NonNullable<FindCapitalProjects500> {
  return createError();
}

/**
 * @description An object containing pagination metadata and an array of capital projects
 */
export function createFindCapitalProjectsQueryResponse(): NonNullable<FindCapitalProjectsQueryResponse> {
  return createCapitalProjectPage();
}
