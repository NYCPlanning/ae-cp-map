import { create } from "zustand";
import type { CommunityBoardBudgetRequestAgencyCategoryResponseStore } from "./community-board-budget-request-agency-category-response";
import { createCommunityBoardBudgetRequestAgencyCategoryResponseStore } from "./community-board-budget-request-agency-category-response";
import type { FacilityTypeStore } from "./facility-type";
import { createFacilityTypeStore } from "./facility-type";

export type Store = CommunityBoardBudgetRequestAgencyCategoryResponseStore &
  FacilityTypeStore;

export const useStore = create<Store>((...a) => ({
  ...createCommunityBoardBudgetRequestAgencyCategoryResponseStore(...a),
  ...createFacilityTypeStore(...a),
}));
