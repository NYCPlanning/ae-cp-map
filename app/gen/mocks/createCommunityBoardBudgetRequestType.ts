import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityBoardBudgetRequestType } from "../types/CommunityBoardBudgetRequestType";

/**
 * @description The type of budget request (Capital or Expense).
 */
export function createCommunityBoardBudgetRequestType(): NonNullable<CommunityBoardBudgetRequestType> {
  return faker.helpers.arrayElement<any>(["Capital", "Expense"]);
}
