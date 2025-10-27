import { z } from "zod";

export const communityBoardBudgetRequestAgencyCategoryResponseSchema = z.object(
  {
    id: z.number().int().describe("The id for the agency request category."),
    description: z
      .string()
      .describe("The name of the agency request category."),
  },
);
