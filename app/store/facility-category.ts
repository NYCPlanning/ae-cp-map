// x@ts-nocheck

import { StateCreator } from "zustand";
import { FacilityOperatorType, FacilityCategory } from "~/gen";
import { QueryParams } from "~/utils/types";

export interface FacilityCategoryCheckboxProps {
  id: number;
  name: string;
  shortName?: string;
  description: string | null;
  checked: boolean;
}

interface FacilityGroupCheckboxProps extends FacilityCategoryCheckboxProps {
  facilityCategoryId: number;
}

interface FacilitySubgroupCheckboxProps extends FacilityGroupCheckboxProps {
  facilityGroupId: number;
}

// export interface FacilityCategoryCheckboxesURLProps {
//   facilityCategoryIds: number[];
//   facilityGroupIds: number[];
//   facilitySubgroupIds: number[];
// }

export interface FacilityCategoryCheckboxesUpdateProps {
  checkboxId: number;
  dismissWelcomeAndUpdateSearchParams: (
    newPath: string,
    changes: QueryParams,
  ) => void;
}

export type FacilityCategoryStore = {
  facilityCategoryCheckboxes: FacilityCategoryCheckboxProps[];
  updateFacilityCategoryCheckboxById: (params: FacilityCategoryCheckboxesUpdateProps) => void;
  facilityGroupCheckboxes: FacilityGroupCheckboxProps[];
  updateFacilityGroupCheckboxById: (checkboxId: number) => void;
  facilitySubgroupCheckboxes: FacilitySubgroupCheckboxProps[];
  updateFacilitySubgroupCheckboxById: (checkboxId: number) => void;
  initializeAllFacilityCategoryCheckboxes: ({
    facilityCategoriesList,
    facilityCategoryIds,
    facilityGroupIds,
    facilitySubgroupIds,
  }: {
    facilityCategoriesList: Array<FacilityCategory>;
    facilityCategoryIds: Array<number>;
    facilityGroupIds: Array<number>;
    facilitySubgroupIds: Array<number>;
  }) => void;
  updateAllFacilityCategoryCheckboxesByValue: (newValue: boolean) => void,
};

export const createFacilityCategoryStore: StateCreator<FacilityCategoryStore> = (
  set, get
) => ({
  // Stored data
  facilityCategoryCheckboxes: [],
  facilityGroupCheckboxes: [],
  facilitySubgroupCheckboxes: [],

  // Functions
  initializeAllFacilityCategoryCheckboxes: ({
    facilityCategoriesList,
    facilityCategoryIds,
    facilityGroupIds,
    facilitySubgroupIds,
  }: {
    facilityCategoriesList: Array<FacilityCategory>;
    facilityCategoryIds: Array<number>;
    facilityGroupIds: Array<number>;
    facilitySubgroupIds: Array<number>;
  }) => {
    const allChecked: boolean = facilityCategoryIds.length === 0 && facilityGroupIds.length === 0 && facilitySubgroupIds.length === 0;
    var c: FacilityCategoryCheckboxProps[] = [];
    var g: FacilityGroupCheckboxProps[] = [];
    var s: FacilitySubgroupCheckboxProps[] = [];

    for (const category of facilityCategoriesList) {
      for (const group of category.groups) {
        for (const subgroup of group.subgroups) {
          // add to s
          s.push({
            id: subgroup.id,
            name: subgroup.name,
            description: subgroup.description,
            checked: allChecked || facilityCategoryIds.includes(category.id) || facilityGroupIds.includes(group.id) || facilitySubgroupIds.includes(subgroup.id),
            facilityCategoryId: category.id,
            facilityGroupId: group.id,
          });
        }
        // add to g
        g.push({
          id: group.id,
          name: group.name,
          description: group.description,
          checked: allChecked || facilityCategoryIds.includes(category.id) || facilityGroupIds.includes(group.id) || s.some((sg) => sg.facilityGroupId === group.id && sg.checked),
          facilityCategoryId: category.id,
        });
      }
      // add to c
      c.push({
        id: category.id,
        name: category.name,
        shortName: category.shortName,
        description: category.description,
        checked: allChecked || facilityCategoryIds.includes(category.id) || g.some((gr) => gr.facilityCategoryId === category.id && gr.checked),
      });
    }

    set(() => ({
      facilityCategoryCheckboxes: c,
      facilityGroupCheckboxes: g,
      facilitySubgroupCheckboxes: s,
    }));
  },

  updateAllFacilityCategoryCheckboxesByValue: (newValue: boolean) =>
    set((state) => ({
      facilityCategoryCheckboxes: state.facilityCategoryCheckboxes.map((item) => {
        return {
          ...item,
          checked: newValue,
        }
      }),
      facilityGroupCheckboxes: state.facilityGroupCheckboxes.map((item) => {
        return {
          ...item,
          checked: newValue,
        }
      }),
      facilitySubgroupCheckboxes: state.facilitySubgroupCheckboxes.map((item) => {
        return {
          ...item,
          checked: newValue,
        }
      })
    })),

  updateFacilityCategoryCheckboxById: ({ checkboxId, dismissWelcomeAndUpdateSearchParams }: FacilityCategoryCheckboxesUpdateProps) => {
    set((state) => ({
      facilityCategoryCheckboxes: state.facilityCategoryCheckboxes.map(
        (category) => {
          return {
            ...category,
            checked: category.id === checkboxId ? !category.checked : category.checked,
          }
        }
      ),

      facilityGroupCheckboxes: state.facilityGroupCheckboxes.map(
        (group) => {
          return {
            ...group,
            checked: group.facilityCategoryId === checkboxId ?
              !state.facilityCategoryCheckboxes.find((cat) => cat.id === group.facilityCategoryId)?.checked :
              group.checked,
          };
        },
      ),

      facilitySubgroupCheckboxes: state.facilitySubgroupCheckboxes.map(
        (subgroup) => {
          return {
            ...subgroup,
            checked: subgroup.facilityCategoryId === checkboxId ?
              !state.facilityCategoryCheckboxes.find((category) => category.id === subgroup.facilityCategoryId)?.checked :
              subgroup.checked,
          };
        },
      ),
    }));


    // This is properly setting the URL params
    // Take this portion below and turn it into a separate function
    // Then use it in all three functions
    // Then implement the rest of the UI




    const subgroupCheckboxes = get().facilitySubgroupCheckboxes;
    const newFacilityCategoryIds = get().facilityCategoryCheckboxes.reduce((acc: number[], curr: FacilityCategoryCheckboxProps) => {
      return subgroupCheckboxes.some((subgroup) => !subgroup.checked && subgroup.facilityCategoryId === curr.id) ? acc : [...acc, curr.id]
    }, []);
    const newFacilityGroupIds = get().facilityGroupCheckboxes.reduce((acc: number[], curr: FacilityGroupCheckboxProps) => {
      return newFacilityCategoryIds.includes(curr.facilityCategoryId) || subgroupCheckboxes.some((subgroup) => !subgroup.checked && subgroup.facilityGroupId === curr.id) ? acc : [...acc, curr.id]
    }, []);
    const newFacilitySubgroupIds = get().facilitySubgroupCheckboxes.reduce((acc: number[], curr: FacilitySubgroupCheckboxProps) => {
      return newFacilityCategoryIds.includes(curr.facilityCategoryId) || newFacilityGroupIds.includes(curr.facilityGroupId)
        || subgroupCheckboxes.some((subgroup) => !subgroup.checked && subgroup.id === curr.id) ? acc : [...acc, curr.id]
    }, []);

    dismissWelcomeAndUpdateSearchParams(
      "/facilities",
      {
        facilityCategoryIds: newFacilityCategoryIds.length > 0 ? newFacilityCategoryIds : null,
        facilityGroupIds: newFacilityGroupIds.length > 0 ? newFacilityGroupIds : null,
        facilitySubgroupIds: newFacilitySubgroupIds.length > 0 ? newFacilitySubgroupIds : null,
      },
    );
  },
  updateFacilityGroupCheckboxById: (checkboxId: number) => {
    set((state) => ({
      facilityGroupCheckboxes: state.facilityGroupCheckboxes.map(
        (group) => {
          return {
            ...group,
            checked: group.id === checkboxId ? !group.checked : group.checked,
          }
        }
      ),
      facilitySubgroupCheckboxes: state.facilitySubgroupCheckboxes.map(
        (subgroup) => {
          return {
            ...subgroup,
            checked: subgroup.facilityGroupId === checkboxId ?
              !state.facilityGroupCheckboxes.find((group) => group.id === subgroup.facilityGroupId)?.checked :
              subgroup.checked,
          };
        },
      ),
    }))
  },
  updateFacilitySubgroupCheckboxById: (checkboxId: number) =>
    set((state) => ({
      facilitySubgroupCheckboxes: state.facilitySubgroupCheckboxes.map(
        (subgroup) => {
          return {
            ...subgroup,
            checked: subgroup.id === checkboxId ? !subgroup.checked : subgroup.checked,
          };
        },
      ),
    })),
});

