import { StateCreator } from "zustand";
import { FacilityOperatorType } from "~/gen";
import { FacilityType } from "~/utils/types";

interface FacilityTypeCheckboxProps {
  name: "Public" | "Non-public" | "Not specified";
  checked: boolean;
}

export type FacilityTypeStore = {
  facilityTypeCheckboxes: FacilityTypeCheckboxProps[];
  initializeFacilityTypeCheckboxes: ({
    checkboxes,
    facilityTypes,
  }: {
    checkboxes: ["Public", "Non-public", "Not specified"];
    facilityTypes: Array<FacilityType>;
  }) => void;
  updateFacilityTypeCheckboxById: (checkboxId: FacilityType) => void;
};

export const createFacilityTypeStore: StateCreator<FacilityTypeStore> = (
  set,
) => ({
  facilityTypeCheckboxes: [],
  initializeFacilityTypeCheckboxes: ({
    checkboxes,
    facilityTypes,
  }: {
    checkboxes: ["Public", "Non-public", "Not specified"];
    facilityTypes: Array<FacilityOperatorType | "Not specified">;
  }) =>
    set(() => ({
      facilityTypeCheckboxes: checkboxes.map((checkbox) => {
        return {
          name: checkbox,
          checked: facilityTypes.includes(checkbox),
        };
      }),
    })),
  updateFacilityTypeCheckboxById: (checkboxId: string) =>
    set((state) => ({
      facilityTypeCheckboxes: state.facilityTypeCheckboxes.map((ft) => {
        return {
          ...ft,
          checked: ft.name === checkboxId ? !ft.checked : ft.checked,
        };
      }),
    })),
});
