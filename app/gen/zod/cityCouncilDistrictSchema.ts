import { z } from "zod";

export const cityCouncilDistrictSchema = z.object({
  id: z
    .string()
    .regex(new RegExp("^([0-9]{1,2})$"))
    .describe("One or two character code to represent city council districts."),
});
