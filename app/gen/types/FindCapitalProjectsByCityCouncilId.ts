import type { Error } from "./Error";
import type { CapitalProjectPage } from "./CapitalProjectPage";

export type FindCapitalProjectsByCityCouncilIdPathParams = {
  /**
   * @description One or two character code to represent city council districts.
   * @type string
   */
  cityCouncilDistrictId: string;
};
/**
 * @description An object containing pagination metadata and an array of capital projects for the city council district
 */
export type FindCapitalProjectsByCityCouncilId200 = CapitalProjectPage;
/**
 * @description Invalid client request
 */
export type FindCapitalProjectsByCityCouncilId400 = Error;
/**
 * @description Requested resource does not exist or is not available
 */
export type FindCapitalProjectsByCityCouncilId404 = Error;
/**
 * @description Server side error
 */
export type FindCapitalProjectsByCityCouncilId500 = Error;
/**
 * @description An object containing pagination metadata and an array of capital projects for the city council district
 */
export type FindCapitalProjectsByCityCouncilIdQueryResponse =
  CapitalProjectPage;
export type FindCapitalProjectsByCityCouncilIdQuery = {
  Response: FindCapitalProjectsByCityCouncilIdQueryResponse;
  PathParams: FindCapitalProjectsByCityCouncilIdPathParams;
  Errors:
    | FindCapitalProjectsByCityCouncilId400
    | FindCapitalProjectsByCityCouncilId404
    | FindCapitalProjectsByCityCouncilId500;
};
