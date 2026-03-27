import { addressResultSchema } from "./addressSchema";
import { errorSchema } from "~/gen";
import { z } from "zod";

export const findAddressesQueryParamsSchema = z.object({
  text: z.string(),
});

/**
 * @description An object containing the geosearch result
 */
export const findAddresses200Schema = z.lazy(() => addressResultSchema);

/**
 * @description Invalid client request
 */
export const findAddresses400Schema = z.lazy(() => errorSchema);

/**
 * @description Server side error
 */
export const findAddresses500Schema = z.lazy(() => errorSchema);

export const findAddressesQueryResponseSchema = z.lazy(
  () => findAddresses200Schema,
);
