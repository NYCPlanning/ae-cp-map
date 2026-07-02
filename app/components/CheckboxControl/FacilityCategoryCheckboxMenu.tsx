import { FilterCheckboxGroup } from "./FilterCheckboxGroup";
import {
  // FacilityCategoryCheckboxMenuId,
  QueryParams,
} from "../../utils/types";
import { FacilityCategoryCheckbox, FilterCheckbox } from ".";
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
import { useDismissWelcomeAndUpdateSearchParams } from "~/utils/utils";
import { useStore } from "~/store";

export interface FacilityCategoryCheckboxMenuProps {
  // onCheckedChange: (
  //   value: FacilityCategoryCheckboxMenuId,
  // ) => void;
  // dismissWelcomeAndUpdateSearchParams: (
  //   newPath: string,
  //   changes: QueryParams,
  // ) => void;
}

export function FacilityCategoryCheckboxMenu({
  // onCheckedChange = () => null,
  // dismissWelcomeAndUpdateSearchParams,
}: FacilityCategoryCheckboxMenuProps) {
  // const facilityCategoryCheckboxMenus = useStore(
  //   (state) => state.facilityCategoryCheckboxMenus,
  // );
  // const selectedCount = facilityCategoryCheckboxMenus.filter(
  //   (c) => c.checked === true,
  // ).length;
  // const updateAllFacilityCategoryCheckboxMenusByValue = useStore(
  //   (state) => state.updateAllFacilityCategoryCheckboxMenusByValue,
  // );
  const {
    facilityCategoryCheckboxes,
    facilityGroupCheckboxes,
    facilitySubgroupCheckboxes,
    updateFacilityCategoryCheckboxById,
    updateFacilityGroupCheckboxById,
    updateFacilitySubgroupCheckboxById,
    updateAllFacilityCategoryCheckboxesByValue,
  } = useStore((state) => state);

  const dismissWelcomeAndUpdateSearchParams = useDismissWelcomeAndUpdateSearchParams();
  const isSelectAllChecked = facilitySubgroupCheckboxes.some((c) => c.checked);
  const isSelectAllIndeterminate = isSelectAllChecked && facilitySubgroupCheckboxes.some((c) => !c.checked);

  return (
    <FormControl
      id={"facilityCategoriesMenu"}
      // marginBottom={marginBottom}
      color="gray.500"
      display={"flex"}
      flexDir={"column"}
      pt={4}
    >
      <FormLabel
        pb={1}
        fontSize={"xs"}
        fontWeight={"bold"}
        display={"flex"}
        gap={1}
      >
        Facility Category
      </FormLabel>

      <Accordion allowToggle width={"100%"} fontSize="xs">
        <AccordionItem border={0} p={0}>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                aria-label={`${isExpanded ? "Close" : "Open"} facility categories menu`}
                p={0}
                _hover={{ backgroundColor: "gray.100" }}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <FilterCheckbox
                  key={"facility-category-all"}
                  checkboxValue={"all"}
                  checkboxLabel={"Select All"}
                  isChecked={isSelectAllChecked}
                  isIndeterminate={isSelectAllIndeterminate}
                  onCheckedChange={() => {
                    updateAllFacilityCategoryCheckboxesByValue(!isSelectAllChecked)
                    dismissWelcomeAndUpdateSearchParams(
                      "/facilities",
                      {
                        facilityCategoryIds: null,
                        facilityGroupIds: null,
                        facilitySubgroupIds: null,
                      },
                    );
                  }}
                />
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel padding={0} flexDirection={"column"}>
                {facilityCategoryCheckboxes.map((facilityCategoryCheckbox) => (<>
                  {/* <div>{facilityCategoryCheckbox.shortName}</div> */}
                  <FacilityCategoryCheckbox facilityCategoryCheckbox={facilityCategoryCheckbox} />
                </>))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

      </Accordion>
    </FormControl>
  );
}
