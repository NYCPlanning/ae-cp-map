import { pageSchema } from "./pageSchema";
import { z } from "zod";

export const communityBoardBudgetRequestPageSchema = z
  .lazy(() => pageSchema)
  .and(
    z.object({
      communityBoardBudgetRequests: z.array(
        z.object({
          id: z
            .string()
            .describe("The id for the community board budget request."),
          cbbrPolicyAreaId: z
            .number()
            .int()
            .describe("The id for the policy area of the request."),
          title: z.string().describe("The title of the budget request."),
          communityBoardId: z
            .string()
            .describe("The id of the community board that made the request."),
          isMapped: z
            .boolean()
            .describe(
              "Whether the budget request has associated mappable data",
            ),
          isContinuedSupport: z
            .boolean()
            .describe("Whether the budget request is for Continued Support"),
        }),
      ),
      totalBudgetRequests: z
        .number()
        .int()
        .min(0)
        .describe("The total number of results matching the query parameters."),
    }),
  );
