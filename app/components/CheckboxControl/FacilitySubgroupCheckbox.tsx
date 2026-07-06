import { FilterCheckbox } from ".";
import type { FacilitySubgroupCheckboxProps } from "~/store/facility-category";
import { HStack, InfoIcon, Tooltip } from "@nycplanning/streetscape";
import { useDismissWelcomeAndUpdateSearchParams } from "~/utils/utils";
import { useStore } from "~/store";

export interface FacilitySubgroupCheckboxComponentProps {
  facilitySubgroupCheckbox: FacilitySubgroupCheckboxProps;
  bgColor: string | undefined;
}

export function FacilitySubgroupCheckbox({
  facilitySubgroupCheckbox,
  bgColor,
}: FacilitySubgroupCheckboxComponentProps) {
  const { facilitySubgroupCheckboxes, updateFacilitySubgroupCheckboxById } =
    useStore((state) => state);

  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();
  const isSubgroupChecked = facilitySubgroupCheckboxes.some(
    (c) => c.checked && c.id === facilitySubgroupCheckbox.id,
  );
  const isSubgroupIndeterminate =
    isSubgroupChecked &&
    facilitySubgroupCheckboxes.some(
      (c) => !c.checked && c.id === facilitySubgroupCheckbox.id,
    );

  return (
    <HStack
      paddingY={2}
      paddingRight={2}
      paddingLeft={10}
      _hover={{ backgroundColor: `${bgColor}26` }}
      width={"100%"}
      justifyContent={"space-between"}
      color={"gray.600"}
    >
      <FilterCheckbox
        key={`facility-category-${facilitySubgroupCheckbox.id}`}
        checkboxValue={facilitySubgroupCheckbox.id}
        checkboxLabel={facilitySubgroupCheckbox.name}
        isChecked={isSubgroupChecked}
        isIndeterminate={isSubgroupIndeterminate}
        onCheckedChange={() => {
          updateFacilitySubgroupCheckboxById({
            checkboxId: facilitySubgroupCheckbox.id,
            dismissWelcomeAndUpdateSearchParams,
          });
        }}
        fontSize={"xs"}
      />
      <HStack gap={1}>
        {facilitySubgroupCheckbox.description !== null && (
          <Tooltip label={facilitySubgroupCheckbox.description} maxW={"240px"}>
            <InfoIcon h={4} w={4} />
          </Tooltip>
        )}
      </HStack>
    </HStack>
  );
}
