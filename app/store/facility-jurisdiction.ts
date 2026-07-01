import { StateCreator } from "zustand";
import { OversightLevelCategory } from "~/gen";
import { FacilityJurisdiction } from "~/utils/types";

interface FacilityJurisdictionCheckboxProps {
  name: "City" | "State" | "Federal" | "County" | "Not specified";
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
          name: checkbox,
          checked: facilityJurisdictions.includes(checkbox),
        };
      }),
    })),
  updateFacilityJurisdictionCheckboxById: (checkboxId: string) =>
    set((state) => ({
      facilityJurisdictionCheckboxes: state.facilityJurisdictionCheckboxes.map(
        (fj) => {
          return {
            ...fj,
            checked: fj.name === checkboxId ? !fj.checked : fj.checked,
          };
        },
      ),
    })),
});
