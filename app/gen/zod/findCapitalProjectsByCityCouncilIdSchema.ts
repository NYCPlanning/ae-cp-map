import { z } from "zod";
import { capitalProjectPageSchema } from "./capitalProjectPageSchema";
import { errorSchema } from "./errorSchema";

export const findCapitalProjectsByCityCouncilIdPathParamsSchema = z.object({
  cityCouncilDistrictId: z
    .string()
    .regex(new RegExp("^([0-9]{1,2})$"))
    .describe("One or two character code to represent city council districts."),
});
/**
 * @description An object containing pagination metadata and an array of capital projects for the city council district
 */
export const findCapitalProjectsByCityCouncilId200Schema = z.lazy(
  () => capitalProjectPageSchema,
);
/**
 * @description Invalid client request
 */
export const findCapitalProjectsByCityCouncilId400Schema = z.lazy(
  () => errorSchema,
);
/**
 * @description Requested resource does not exist or is not available
 */
export const findCapitalProjectsByCityCouncilId404Schema = z.lazy(
  () => errorSchema,
);
/**
 * @description Server side error
 */
export const findCapitalProjectsByCityCouncilId500Schema = z.lazy(
  () => errorSchema,
);
/**
 * @description An object containing pagination metadata and an array of capital projects for the city council district
 */
export const findCapitalProjectsByCityCouncilIdQueryResponseSchema = z.lazy(
  () => capitalProjectPageSchema,
);
