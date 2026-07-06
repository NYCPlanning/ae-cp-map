import { FacilityCategoryCheckbox, FilterCheckbox } from ".";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  FormControl,
  FormLabel,
} from "@nycplanning/streetscape";
import { useDismissWelcomeAndUpdateSearchParams } from "~/utils/utils";
import { useStore } from "~/store";

export function FacilityCategoryCheckboxMenu() {
  const {
    facilityCategoryCheckboxes,
    facilitySubgroupCheckboxes,
    updateAllFacilityCategoryCheckboxesByValue,
  } = useStore((state) => state);

  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();
  const isSelectAllChecked = facilitySubgroupCheckboxes.some((c) => c.checked);
  const isSelectAllIndeterminate =
    isSelectAllChecked && facilitySubgroupCheckboxes.some((c) => !c.checked);

  return (
    <FormControl
      id={"facilityCategoriesMenu"}
      color="gray.500"
      display={"flex"}
      flexDir={"column"}
    >
      <FormLabel pb={0} fontSize={"xs"} fontWeight={"bold"} display={"flex"}>
        Facility Category
      </FormLabel>

      <Accordion allowToggle width={"100%"} fontSize="xs">
        <AccordionItem border={0} p={0}>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                aria-label={`${isExpanded ? "Close" : "Open"} facility categories menu`}
                paddingY={2}
                paddingRight={2}
                paddingLeft={0}
                _hover={{ backgroundColor: "gray.100" }}
                width={"100%"}
                justifyContent={"space-between"}
                color={"gray.600"}
                borderStyle={"none"}
                outline={"none"}
              >
                <FilterCheckbox
                  key={"facility-category-all"}
                  checkboxValue={"all"}
                  checkboxLabel={"Select All"}
                  isChecked={isSelectAllChecked}
                  isIndeterminate={isSelectAllIndeterminate}
                  onCheckedChange={() => {
                    updateAllFacilityCategoryCheckboxesByValue(
                      !isSelectAllChecked,
                    );
                    dismissWelcomeAndUpdateSearchParams("/facilities", {
                      facilityCategoryIds: null,
                      facilityGroupIds: null,
                      facilitySubgroupIds: null,
                    });
                  }}
                />
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                paddingY={0}
                paddingRight={2}
                paddingLeft={0}
                flexDirection={"column"}
              >
                {facilityCategoryCheckboxes.map((facilityCategoryCheckbox) => (
                  <FacilityCategoryCheckbox
                    key={`category-${facilityCategoryCheckbox.id}`}
                    facilityCategoryCheckbox={facilityCategoryCheckbox}
                  />
                ))}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </FormControl>
  );
}
