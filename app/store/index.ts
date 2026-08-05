import { create } from "zustand";
import type { CommunityBoardBudgetRequestAgencyCategoryResponseStore } from "./community-board-budget-request-agency-category-response";
import { createCommunityBoardBudgetRequestAgencyCategoryResponseStore } from "./community-board-budget-request-agency-category-response";
import type { FacilityTypeStore } from "./facility-type";
import { createFacilityTypeStore } from "./facility-type";
import type { FacilityJurisdictionStore } from "./facility-jurisdiction";
import { createFacilityJurisdictionStore } from "./facility-jurisdiction";
import type { FacilityCategoryStore } from "./facility-category";
import { createFacilityCategoryStore } from "./facility-category";
import type { ExportDataModalStore } from "./export-data-modal";
import { createExportDataModalStore } from "./export-data-modal";

export type Store = CommunityBoardBudgetRequestAgencyCategoryResponseStore &
  FacilityTypeStore &
  FacilityJurisdictionStore &
  FacilityCategoryStore &
  ExportDataModalStore;

export const useStore = create<Store>((...a) => ({
  ...createCommunityBoardBudgetRequestAgencyCategoryResponseStore(...a),
  ...createFacilityTypeStore(...a),
  ...createFacilityJurisdictionStore(...a),
  ...createFacilityCategoryStore(...a),
  ...createExportDataModalStore(...a),
}));
