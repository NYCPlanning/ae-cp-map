import { FilterCheckboxGroup } from "./FilterCheckboxGroup";
import {
  // FacilityCategoryCheckboxId,
  QueryParams,
} from "../../utils/types";
import { FilterCheckbox } from ".";
import type { FacilityCategoryCheckboxProps } from "~/store/facility-category";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ChevronLeftIcon,
  EmailInvertedIcon,
  ExternalLinkIcon,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Tag,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
  InfoIcon,
  SpacerProps,
  Tooltip,
} from "@nycplanning/streetscape";
import { useDismissWelcomeAndUpdateSearchParams, useUpdateSearchParams } from "~/utils/utils";
import { useStore } from "~/store";

const FACILITY_CATEGORY_ID_COLORS = new Map<number, string>([
  [1, "#F0CB32"],
  [2, "#58AE57"],
  [3, "#EB9028"],
  [4, "#86E3F3"],
  [5, "#4977FA"],
  [6, "#B66AC5"],
  [7, "#8E8EA9"],
]);

export interface FacilityCategoryCheckboxComponentProps {
  facilityCategoryCheckbox: FacilityCategoryCheckboxProps
}

export function FacilityCategoryCheckbox({
  facilityCategoryCheckbox
}: FacilityCategoryCheckboxComponentProps) {
  const {
    facilityCategoryCheckboxes,
    facilityGroupCheckboxes,
    facilitySubgroupCheckboxes,
    updateFacilityCategoryCheckboxById,
    updateFacilityGroupCheckboxById,
    updateFacilitySubgroupCheckboxById,
    updateAllFacilityCategoryCheckboxesByValue,
  } = useStore((state) => state);

  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const facilityCategoryIdsParam = searchParams.get("facilityCategoryIds");
  const facilityCategoryIds =
    facilityCategoryIdsParam === null
      ? []
      : (facilityCategoryIdsParam.split(",").map((id) => parseInt(id)));

  const dismissWelcomeAndUpdateSearchParams = useDismissWelcomeAndUpdateSearchParams();
  const isCategoryChecked = facilitySubgroupCheckboxes.some((c) => c.checked && c.facilityCategoryId === facilityCategoryCheckbox.id);
  const isCategoryIndeterminate = isCategoryChecked && facilitySubgroupCheckboxes.some((c) => !c.checked && c.facilityCategoryId === facilityCategoryCheckbox.id);

  console.log("facilityCategoryCheckboxes", facilityCategoryCheckboxes.map((x) => `${x.id} ${x.checked}`))
  console.log("facilityGroupCheckboxes", facilityGroupCheckboxes.map((x) => `${x.id} ${x.checked}`))
  console.log("facilitySubgroupCheckboxes", facilitySubgroupCheckboxes.map((x) => `${x.id} ${x.checked}`))

  return (
    <Accordion allowToggle width={"100%"} fontSize="xs">
      <AccordionItem border={"1px solid"} borderRadius={2} bg={`${FACILITY_CATEGORY_ID_COLORS.get(facilityCategoryCheckbox.id)}1A`} p={0}>
        {({ isExpanded }) => (
          <>
            <AccordionButton
              aria-label={`${isExpanded ? "Close" : "Open"} ${facilityCategoryCheckbox.shortName}`}
              p={0}
              _hover={{ backgroundColor: "gray.100" }}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <FilterCheckbox
                key={`facility-category-${facilityCategoryCheckbox.id}`}
                checkboxValue={facilityCategoryCheckbox.id}
                checkboxLabel={facilityCategoryCheckbox.shortName || ""}
                isChecked={isCategoryChecked}
                isIndeterminate={isCategoryIndeterminate}
                onCheckedChange={(v) => {
                  updateFacilityCategoryCheckboxById({ checkboxId: facilityCategoryCheckbox.id, dismissWelcomeAndUpdateSearchParams })
                  //Going to handle figuring out the new url params as part of the update

                  // if (v === null)
                  //   throw new Error(
                  //     "Unexpected null for facility category id",
                  //   );
                  // const value = parseInt(String(v), 10);
                  // let nextValue: Array<number> | null;
                  // if (facilityCategoryIds === null) {
                  //   nextValue = [value];
                  // } else if (
                  //   facilityCategoryIds.includes(value)
                  // ) {
                  //   const removedValue = facilityCategoryIds.filter(
                  //     (item) => item !== value,
                  //   );
                  //   nextValue = removedValue.length === 0 ? null : removedValue;
                  // } else {
                  //   nextValue = facilityCategoryIds.concat([value]);
                  // }

                  // dismissWelcomeAndUpdateSearchParams(
                  //   "/facilities",
                  //   {
                  //     facilityCategoryIds: null,
                  //     facilityGroupIds: null,
                  //     facilitySubgroupIds: null,
                  //   },
                  // );
                }}
              />
              <HStack gap={1}>
                <Flex
                  marginX={1}
                  marginY={1.5}
                  w={2}
                  h={2}
                  bg={FACILITY_CATEGORY_ID_COLORS.get(facilityCategoryCheckbox.id)}
                  borderRadius={"2px"}
                />
                {facilityCategoryCheckbox.description !== null && (
                  <Tooltip label={facilityCategoryCheckbox.description}>
                    <InfoIcon />
                  </Tooltip>
                )}
              </HStack>

              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding={0} flexDirection={"column"}>
              {/* {facilityCategoryCheckboxes.map((facilityCategoryCheckbox) => (<>
              <div>{facilityCategoryCheckbox.shortName}</div>
            </>))} */}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>

  );
}
