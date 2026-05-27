import { create } from "zustand";
import { CommunityBoardBudgetRequestAgencyCategoryResponse } from "~/gen";

interface CommunityBoardBudgetRequestAgencyCategoryResponseCheckboxProps
  extends CommunityBoardBudgetRequestAgencyCategoryResponse {
  checked: boolean;
}

export type Store = {
  cbbrAgencyCategoryResponseCheckboxes: CommunityBoardBudgetRequestAgencyCategoryResponseCheckboxProps[];
  initializeCbbrAgencyCategoryResponseCheckboxes: ({
    checkboxes,
    cbbrAgencyCategoryResponseIds,
  }: {
    checkboxes: CommunityBoardBudgetRequestAgencyCategoryResponse[];
    cbbrAgencyCategoryResponseIds: number[];
  }) => void;
  updateCbbrAgencyCategoryResponseCheckboxById: (checkboxId: number) => void;
  updateAllCbbrAgencyCategoryResponseCheckboxesByValue: (
    checked: boolean,
  ) => void;
};

export const useStore = create<Store>()((set) => ({
  cbbrAgencyCategoryResponseCheckboxes: [],
  initializeCbbrAgencyCategoryResponseCheckboxes: ({
    checkboxes,
    cbbrAgencyCategoryResponseIds,
  }: {
    checkboxes: CommunityBoardBudgetRequestAgencyCategoryResponse[];
    cbbrAgencyCategoryResponseIds: number[];
  }) =>
    set(() => ({
      cbbrAgencyCategoryResponseCheckboxes: checkboxes.map((checkbox) => {
        return {
          ...checkbox,
          checked: cbbrAgencyCategoryResponseIds.includes(checkbox.id),
        };
      }),
    })),
  updateCbbrAgencyCategoryResponseCheckboxById: (checkboxId: number) =>
    set((state) => ({
      cbbrAgencyCategoryResponseCheckboxes:
        state.cbbrAgencyCategoryResponseCheckboxes.map((acr) => {
          return {
            ...acr,
            checked: acr.id === checkboxId ? !acr.checked : acr.checked,
          };
        }),
    })),
  updateAllCbbrAgencyCategoryResponseCheckboxesByValue: (checked: boolean) =>
    set((state) => ({
      cbbrAgencyCategoryResponseCheckboxes:
        state.cbbrAgencyCategoryResponseCheckboxes
          .map((checkbox) => {
            return { ...checkbox, checked };
          })
          .sort((a, b) => a.id - b.id),
    })),
}));
