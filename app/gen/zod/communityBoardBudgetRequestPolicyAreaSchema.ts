import { z } from "zod";

export const communityBoardBudgetRequestPolicyAreaSchema = z.object({
  id: z.number().int().describe("The id for the policy area"),
  description: z.string().describe("The name of the policy area."),
});
