import { z } from "zod";

export const communityBoardBudgetRequestNeedGroupSchema = z.object({
  id: z.number().int().describe("The id for the need group"),
  description: z.string().describe("The name of the need group."),
});
