import { z } from "zod";
import { cityCouncilDistrictSchema } from "./cityCouncilDistrictSchema";
import { errorSchema } from "./errorSchema";

/**
 * @description an object of city council districts
 */
export const findCityCouncilDistricts200Schema = z.object({
  cityCouncilDistricts: z.array(z.lazy(() => cityCouncilDistrictSchema)),
  order: z
    .string()
    .describe(
      "City council districts ids are sorted as if numbers in ascending order",
    ),
});
/**
 * @description Invalid client request
 */
export const findCityCouncilDistricts400Schema = z.lazy(() => errorSchema);
/**
 * @description Server side error
 */
export const findCityCouncilDistricts500Schema = z.lazy(() => errorSchema);
/**
 * @description an object of city council districts
 */
export const findCityCouncilDistrictsQueryResponseSchema = z.object({
  cityCouncilDistricts: z.array(z.lazy(() => cityCouncilDistrictSchema)),
  order: z
    .string()
    .describe(
      "City council districts ids are sorted as if numbers in ascending order",
    ),
});
