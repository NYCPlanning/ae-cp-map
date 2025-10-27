import { communityBoardBudgetRequestTypeSchema } from "./communityBoardBudgetRequestTypeSchema";
import { z } from "zod";

export const communityBoardBudgetRequestSchema = z.object({
  id: z.string().describe("The id for the community board budget request."),
  cbbrPolicyAreaId: z
    .number()
    .int()
    .describe("The id for the policy area of the request."),
  title: z.string().describe("The title of the budget request."),
  description: z.string().describe("Description of the budget request."),
  communityBoardId: z
    .string()
    .describe("The id of the community board that made the request."),
  agencyInitials: z
    .string()
    .describe("Initials of the agency of which the request was made."),
  priority: z
    .number()
    .describe("The board's ranking of the request's priority"),
  cbbrType: z.lazy(() => communityBoardBudgetRequestTypeSchema),
  isMapped: z
    .boolean()
    .describe("Whether the budget request has associated mappable data"),
  isContinuedSupport: z
    .boolean()
    .describe("Whether the budget request is for Continued Support"),
  cbbrAgencyCategoryResponseId: z
    .number()
    .describe("The id of the agency's response category")
    .optional(),
  cbbrAgencyResponse: z
    .string()
    .describe("The agency's written explanation for the response category")
    .optional(),
});
