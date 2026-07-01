import { StateCreator } from "zustand";
import { OversightLevelCategory } from "~/gen";
import { FacilityJurisdiction } from "~/utils/types";

interface FacilityJurisdictionCheckboxProps {
  id: "City" | "State" | "Federal" | "County" | "Not specified";
  checked: boolean;
}

export type FacilityJurisdictionStore = {
  facilityJurisdictionCheckboxes: FacilityJurisdictionCheckboxProps[];
  initializeFacilityJurisdictionCheckboxes: ({
    checkboxes,
    facilityJurisdictions,
  }: {
    checkboxes: ["City", "State", "Federal", "County", "Not specified"];
    facilityJurisdictions: Array<FacilityJurisdiction>;
  }) => void;
  updateFacilityJurisdictionCheckboxById: (
    checkboxId: FacilityJurisdiction,
  ) => void;
};

export const createFacilityJurisdictionStore: StateCreator<
  FacilityJurisdictionStore
> = (set) => ({
  facilityJurisdictionCheckboxes: [],
  initializeFacilityJurisdictionCheckboxes: ({
    checkboxes,
    facilityJurisdictions,
  }: {
    checkboxes: ["City", "State", "Federal", "County", "Not specified"];
    facilityJurisdictions: Array<OversightLevelCategory | "Not specified">;
  }) =>
    set(() => ({
      facilityJurisdictionCheckboxes: checkboxes.map((checkbox) => {
        return {
          id: checkbox,
          checked: facilityJurisdictions.includes(checkbox),
        };
      }),
    })),
  updateFacilityJurisdictionCheckboxById: (checkboxId: string) =>
    set((state) => ({
      facilityJurisdictionCheckboxes: state.facilityJurisdictionCheckboxes.map(
        (fJ) => {
          return {
            ...fJ,
            checked: fJ.id === checkboxId ? !fJ.checked : fJ.checked,
          };
        },
      ),
    })),
});
