import { FilterCheckbox } from ".";
import type { FacilityGroupCheckboxProps } from "~/store/facility-category";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  InfoIcon,
  Tooltip,
} from "@nycplanning/streetscape";
import { useDismissWelcomeAndUpdateSearchParams } from "~/utils/utils";
import { useStore } from "~/store";
import { FacilitySubgroupCheckbox } from "./FacilitySubgroupCheckbox";

export interface FacilityGroupCheckboxComponentProps {
  facilityGroupCheckbox: FacilityGroupCheckboxProps;
  bgColor: string | undefined;
}

export function FacilityGroupCheckbox({
  facilityGroupCheckbox,
  bgColor,
}: FacilityGroupCheckboxComponentProps) {
  const { facilitySubgroupCheckboxes, updateFacilityGroupCheckboxById } =
    useStore((state) => state);

  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();
  const isGroupChecked = facilitySubgroupCheckboxes.some(
    (c) => c.checked && c.facilityGroupId === facilityGroupCheckbox.id,
  );
  const isGroupIndeterminate =
    isGroupChecked &&
    facilitySubgroupCheckboxes.some(
      (c) => !c.checked && c.facilityGroupId === facilityGroupCheckbox.id,
    );

  return (
    <Accordion allowToggle width={"100%"} fontSize="xs">
      <AccordionItem p={0} border={0}>
        {({ isExpanded }) => (
          <>
            <AccordionButton
              aria-label={`${isExpanded ? "Close" : "Open"} ${facilityGroupCheckbox.name}`}
              paddingY={2}
              paddingRight={2}
              paddingLeft={5}
              _hover={{ backgroundColor: `${bgColor}26` }}
              width={"100%"}
              justifyContent={"space-between"}
              color={"gray.600"}
            >
              <FilterCheckbox
                key={`facility-category-${facilityGroupCheckbox.id}`}
                checkboxValue={facilityGroupCheckbox.id}
                checkboxLabel={facilityGroupCheckbox.name}
                isChecked={isGroupChecked}
                isIndeterminate={isGroupIndeterminate}
                onCheckedChange={() => {
                  updateFacilityGroupCheckboxById({
                    checkboxId: facilityGroupCheckbox.id,
                    dismissWelcomeAndUpdateSearchParams,
                  });
                }}
                fontSize={"xs"}
              />
              <HStack gap={1}>
                {facilityGroupCheckbox.description !== null && (
                  <Tooltip
                    label={facilityGroupCheckbox.description}
                    maxW={"240px"}
                  >
                    <InfoIcon />
                  </Tooltip>
                )}
                <AccordionIcon />
              </HStack>
            </AccordionButton>
            <AccordionPanel padding={0} flexDirection={"column"}>
              {facilitySubgroupCheckboxes
                .filter((cb) => cb.facilityGroupId === facilityGroupCheckbox.id)
                .map((facilitySubgroupCheckbox) => (
                  <FacilitySubgroupCheckbox
                    key={`subgroup-${facilitySubgroupCheckbox.id}`}
                    facilitySubgroupCheckbox={facilitySubgroupCheckbox}
                    bgColor={bgColor}
                  />
                ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
