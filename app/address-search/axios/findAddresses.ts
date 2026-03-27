import fetch from "@kubb/plugin-client/clients/axios";
import type {
  FindAddressesQueryParams,
  FindAddresses400,
  FindAddresses500,
  FindAddressesQueryResponse,
} from "../types/FindAddresses";
import type {
  RequestConfig,
  ResponseErrorConfig,
} from "@kubb/plugin-client/clients/axios";
import { findAddressesQueryResponseSchema } from "../zod";

/**
 * @summary Find addresses
 * {@link /addresses}
 */
export async function findAddresses(
  text: FindAddressesQueryParams["text"],
  config: Partial<RequestConfig> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config;

  const res = await request<
    FindAddressesQueryResponse,
    ResponseErrorConfig<FindAddresses400 | FindAddresses500>,
    unknown
  >({
    method: "GET",
    url: `https://geosearch.planninglabs.nyc/v2/autocomplete?size=5&text=${text}`,
    ...requestConfig,
  });
  try {
    findAddressesQueryResponseSchema.parse(res.data);
  } catch (e) {
    console.error("Invalid response", res);
  }

  return res.data;
}
