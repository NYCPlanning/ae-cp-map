import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import { useDismissWelcomeAndUpdateSearchParams } from "../utils/utils";
import {
  FacilityOversightAgency,
  FacilityJurisdiction,
  FacilityJurisdictions,
  FacilityType,
  FacilityTypes,
} from "../utils/types";
import { ClearFilterBtn } from "./ClearFilter";
import { OversightAgencyDropdown } from "./DropdownControl";
import {
  FacilityJurisdictionCheckbox,
  FacilityTypeCheckbox,
  FacilityCategoryCheckboxMenu,
} from "./CheckboxControl";
import { useStore } from "~/store";
import { Agency } from "~/gen";

export interface SearchByFacilityMenuProps {
  onClear: () => void;
  updateFiltersAccordion: () => void;
  facilityAgencies: Array<Agency> | null;
  facilityOversightAgency: FacilityOversightAgency;
}

export const SearchByFacilityMenu = ({
  onClear,
  updateFiltersAccordion,
  facilityAgencies,
  facilityOversightAgency,
}: SearchByFacilityMenuProps) => {
  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();

  const facilityTypeIds = useStore((state) => state.facilityTypeCheckboxes)
    .filter((ft) => ft.checked === true)
    .map((ft) => ft.name);
  const facilityJurisdictionIds = useStore(
    (state) => state.facilityJurisdictionCheckboxes,
  )
    .filter((fj) => fj.checked === true)
    .map((fj) => fj.name);
  const {
    updateFacilityTypeCheckboxById,
    updateFacilityJurisdictionCheckboxById,
    facilitySubgroupCheckboxes,
  } = useStore((state) => state);

  const appliedFilters: number[] = [
    facilityTypeIds !== null && facilityTypeIds.length < 3
      ? facilityTypeIds.length
      : 0,
    facilityOversightAgency !== null ? 1 : 0,
    facilityJurisdictionIds !== null && facilityJurisdictionIds.length < 5
      ? facilityJurisdictionIds.length
      : 0,
    facilitySubgroupCheckboxes.some((c) => c.checked) &&
    facilitySubgroupCheckboxes.some((c) => !c.checked)
      ? 1
      : 0,
  ];

  return (
    <AccordionItem
      fontFamily="body"
      color="primary.600"
      backgroundColor="gray.50"
      borderStyle="solid"
      borderRadius={"sm"}
      borderWidth={"1px"}
      marginTop={2}
      marginX={0}
    >
      <AccordionButton
        aria-label="Close search by facility menu"
        paddingY={0}
        paddingX={3}
        onClick={updateFiltersAccordion}
      >
        <Heading
          flex="1"
          textAlign="left"
          fontSize="xs"
          fontWeight="bold"
          lineHeight="32px"
          paddingBottom={0}
        >
          {`Filters (${appliedFilters.reduce((acc, curr) => acc + curr, 0)})`}
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        paddingTop={0}
        paddingX={3}
        paddingBottom={6}
        display={"flex"}
        flexDirection={"column"}
      >
        <ClearFilterBtn onClear={onClear} buttonLabel="Reset All" />
        <FacilityJurisdictionCheckbox
          onCheckedChange={(value: FacilityJurisdiction | null) => {
            if (value === null)
              throw new Error("Unexpected null for facility type id");
            let nextValue: FacilityJurisdictions;
            if (facilityJurisdictionIds === null) {
              nextValue = [value];
            } else if (facilityJurisdictionIds.includes(value)) {
              const removedValue = facilityJurisdictionIds.filter(
                (item) => item !== value,
              );
              nextValue = removedValue.length === 0 ? null : removedValue;
            } else {
              nextValue = facilityJurisdictionIds.concat([value]);
            }
            updateFacilityJurisdictionCheckboxById(value);
            dismissWelcomeAndUpdateSearchParams("/facilities", {
              facilityJurisdictions:
                nextValue === null || nextValue.length === 5 ? null : nextValue,
            });
          }}
        />
        <FacilityTypeCheckbox
          onCheckedChange={(value: FacilityType | null) => {
            if (value === null)
              throw new Error("Unexpected null for facility type id");
            let nextValue: FacilityTypes;
            if (facilityTypeIds === null) {
              nextValue = [value];
            } else if (facilityTypeIds.includes(value)) {
              const removedValue = facilityTypeIds.filter(
                (item) => item !== value,
              );
              nextValue = removedValue.length === 0 ? null : removedValue;
            } else {
              nextValue = facilityTypeIds.concat([value]);
            }
            updateFacilityTypeCheckboxById(value);
            dismissWelcomeAndUpdateSearchParams("/facilities", {
              facilityTypes:
                nextValue === null || nextValue.length === 3 ? null : nextValue,
            });
          }}
        />
        <OversightAgencyDropdown
          agencies={facilityAgencies}
          selectValue={facilityOversightAgency}
          onSelectValueChange={(value) => {
            dismissWelcomeAndUpdateSearchParams("/facilities", {
              facilityOversightAgency: value,
            });
          }}
        />
        <FacilityCategoryCheckboxMenu />
      </AccordionPanel>
    </AccordionItem>
  );
};
