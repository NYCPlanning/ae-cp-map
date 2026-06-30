import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import { useDismissWelcomeAndUpdateSearchParams } from "../utils/utils";
import { FacilityType, FacilityTypes } from "../utils/types";
import { ClearFilterBtn } from "./ClearFilter";
import { FacilityTypeCheckbox } from "./CheckboxControl";
import { useStore } from "~/store";

export interface SearchByFacilityMenuProps {
  onClear: () => void;
  updateFiltersAccordion: () => void;
}

export const SearchByFacilityMenu = ({
  onClear,
  updateFiltersAccordion,
}: SearchByFacilityMenuProps) => {
  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();

  const facilityTypeIds = useStore((state) => state.facilityTypeCheckboxes)
    .filter((ft) => ft.checked === true)
    .map((ft) => ft.id);
  const updateFacilityTypeCheckboxById = useStore(
    (state) => state.updateFacilityTypeCheckboxById,
  );

  const appliedFilters: number[] = [
    facilityTypeIds !== null && facilityTypeIds.length < 3
      ? facilityTypeIds.length
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
          dismissWelcomeAndUpdateSearchParams={
            dismissWelcomeAndUpdateSearchParams
          }
        />
      </AccordionPanel>
    </AccordionItem>
  );
};
