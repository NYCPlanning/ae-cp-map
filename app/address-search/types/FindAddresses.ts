import type { AddressResult } from "./Address";
import type { Error } from "../../gen/types/Error";

export type FindAddressesQueryParams = {
  text: string;
};

/**
 * @description An object containing the geosearch result
 */
export type FindAddresses200 = AddressResult;

/**
 * @description Invalid client request
 */
export type FindAddresses400 = Error;

/**
 * @description Server side error
 */
export type FindAddresses500 = Error;

export type FindAddressesQueryResponse = FindAddresses200;

export type FindAddressesQuery = {
  Response: FindAddresses200;
  Errors: FindAddresses400 | FindAddresses500;
};
