import type { Error } from "./Error";
import type { CapitalProjectPage } from "./CapitalProjectPage";

export type FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams = {
  /**
   * @description A single character numeric string containing the common number used to refer to the borough. Possible values are 1-5.
   * @type string
   */
  boroughId: string;
  /**
   * @description The two character numeric string containing the number used to refer to the community district.
   * @type string
   */
  communityDistrictId: string;
};
/**
 * @description An object containing pagination metadata and an array of capital projects for the community district
 */
export type FindCapitalProjectsByBoroughIdCommunityDistrictId200 =
  CapitalProjectPage;
/**
 * @description Invalid client request
 */
export type FindCapitalProjectsByBoroughIdCommunityDistrictId400 = Error;
/**
 * @description Requested resource does not exist or is not available
 */
export type FindCapitalProjectsByBoroughIdCommunityDistrictId404 = Error;
/**
 * @description Server side error
 */
export type FindCapitalProjectsByBoroughIdCommunityDistrictId500 = Error;
/**
 * @description An object containing pagination metadata and an array of capital projects for the community district
 */
export type FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse =
  CapitalProjectPage;
export type FindCapitalProjectsByBoroughIdCommunityDistrictIdQuery = {
  Response: FindCapitalProjectsByBoroughIdCommunityDistrictIdQueryResponse;
  PathParams: FindCapitalProjectsByBoroughIdCommunityDistrictIdPathParams;
  Errors:
    | FindCapitalProjectsByBoroughIdCommunityDistrictId400
    | FindCapitalProjectsByBoroughIdCommunityDistrictId404
    | FindCapitalProjectsByBoroughIdCommunityDistrictId500;
};
