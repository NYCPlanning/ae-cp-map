import { create } from "zustand";
import type { CommunityBoardBudgetRequestAgencyCategoryResponseStore } from "./community-board-budget-request-agency-category-response";
import { createCommunityBoardBudgetRequestAgencyCategoryResponseStore } from "./community-board-budget-request-agency-category-response";
import type { FacilityTypeStore } from "./facility-type";
import { createFacilityTypeStore } from "./facility-type";
import type { FacilityJurisdictionStore } from "./facility-jurisdiction";
import { createFacilityJurisdictionStore } from "./facility-jurisdiction";

export type Store = CommunityBoardBudgetRequestAgencyCategoryResponseStore &
  FacilityTypeStore &
  FacilityJurisdictionStore;

export const useStore = create<Store>((...a) => ({
  ...createCommunityBoardBudgetRequestAgencyCategoryResponseStore(...a),
  ...createFacilityTypeStore(...a),
  ...createFacilityJurisdictionStore(...a),
}));
