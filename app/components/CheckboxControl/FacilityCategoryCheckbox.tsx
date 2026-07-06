import { FilterCheckbox } from ".";
import type { FacilityCategoryCheckboxProps } from "~/store/facility-category";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  HStack,
  InfoIcon,
  Tooltip,
} from "@nycplanning/streetscape";
import { useDismissWelcomeAndUpdateSearchParams } from "~/utils/utils";
import { useStore } from "~/store";
import { FacilityGroupCheckbox } from "./FacilityGroupCheckbox";
import { FACILITY_CATEGORY_ID_COLORS } from "~/utils/constants";

export interface FacilityCategoryCheckboxComponentProps {
  facilityCategoryCheckbox: FacilityCategoryCheckboxProps;
}

export function FacilityCategoryCheckbox({
  facilityCategoryCheckbox,
}: FacilityCategoryCheckboxComponentProps) {
  const {
    facilityGroupCheckboxes,
    facilitySubgroupCheckboxes,
    updateFacilityCategoryCheckboxById,
  } = useStore((state) => state);

  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();
  const isCategoryChecked = facilitySubgroupCheckboxes.some(
    (c) => c.checked && c.facilityCategoryId === facilityCategoryCheckbox.id,
  );
  const isCategoryIndeterminate =
    isCategoryChecked &&
    facilitySubgroupCheckboxes.some(
      (c) => !c.checked && c.facilityCategoryId === facilityCategoryCheckbox.id,
    );

  return (
    <Accordion allowToggle width={"100%"} fontSize="xs" marginBottom={1}>
      <AccordionItem
        border={"1px solid"}
        borderColor={FACILITY_CATEGORY_ID_COLORS.get(
          facilityCategoryCheckbox.id,
        )}
        borderRadius={2}
        bg={`${FACILITY_CATEGORY_ID_COLORS.get(facilityCategoryCheckbox.id)}1A`}
        p={0}
      >
        {({ isExpanded }) => (
          <>
            <AccordionButton
              aria-label={`${isExpanded ? "Close" : "Open"} ${facilityCategoryCheckbox.shortName}`}
              p={2}
              _hover={{
                backgroundColor: `${FACILITY_CATEGORY_ID_COLORS.get(facilityCategoryCheckbox.id)}26`,
              }}
              width={"100%"}
              justifyContent={"space-between"}
              color={"gray.600"}
              alignItems={"flex-start"}
            >
              <FilterCheckbox
                key={`facility-category-${facilityCategoryCheckbox.id}`}
                checkboxValue={facilityCategoryCheckbox.id}
                checkboxLabel={facilityCategoryCheckbox.shortName || ""}
                isChecked={isCategoryChecked}
                isIndeterminate={isCategoryIndeterminate}
                onCheckedChange={() => {
                  updateFacilityCategoryCheckboxById({
                    checkboxId: facilityCategoryCheckbox.id,
                    dismissWelcomeAndUpdateSearchParams,
                  });
                }}
              />
              <HStack gap={1}>
                <Flex
                  marginX={1}
                  marginY={1.5}
                  w={2}
                  h={2}
                  bg={FACILITY_CATEGORY_ID_COLORS.get(
                    facilityCategoryCheckbox.id,
                  )}
                  borderRadius={"2px"}
                />
                {facilityCategoryCheckbox.description !== null && (
                  <Tooltip
                    label={facilityCategoryCheckbox.description}
                    maxW={"240px"}
                  >
                    <InfoIcon />
                  </Tooltip>
                )}
                <AccordionIcon />
              </HStack>
            </AccordionButton>
            <AccordionPanel padding={0} flexDirection={"column"}>
              {facilityGroupCheckboxes
                .filter(
                  (cb) => cb.facilityCategoryId === facilityCategoryCheckbox.id,
                )
                .map((facilityGroupCheckbox) => (
                  <FacilityGroupCheckbox
                    key={`group-${facilityGroupCheckbox.id}`}
                    facilityGroupCheckbox={facilityGroupCheckbox}
                    bgColor={FACILITY_CATEGORY_ID_COLORS.get(
                      facilityCategoryCheckbox.id,
                    )}
                  />
                ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
