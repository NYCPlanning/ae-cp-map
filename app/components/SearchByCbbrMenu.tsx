import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import { useUpdateSearchParams } from "../utils/utils";
import {
  Agency,
  CommunityBoardBudgetRequestNeedGroup,
  CommunityBoardBudgetRequestPolicyArea,
} from "../gen";
import {
  CommunityBoardBudgetRequestAgencyInitials,
  CommunityBoardBudgetRequestNeedGroupId,
  CommunityBoardBudgetRequestPolicyAreaId,
} from "../utils/types";
import { ClearFilterBtn } from "./ClearFilter";
import { CommunityBoardBudgetRequestPolicyAreaDropdown } from "./DropdownControl/CommunityBoardBudgetRequestPolicyAreaDropdown";
import { CommunityBoardBudgetRequestNeedGroupDropdown } from "./DropdownControl/CommunityBoardBudgetRequestNeedGroupDropdown";
import { CommunityBoardBudgetRequestAgencyDropdown } from "./DropdownControl/CommunityBoardBudgetRequestAgencyDropdown";

export interface SearchByCbbrMenuProps {
  cbbrPolicyAreas: Array<CommunityBoardBudgetRequestPolicyArea> | null;
  cbbrNeedGroups: Array<CommunityBoardBudgetRequestNeedGroup> | null;
  cbbrAgencies: Array<Agency> | null;
  onClear: () => void;
}

export const SearchByCbbrMenu = ({
  cbbrPolicyAreas,
  cbbrNeedGroups,
  cbbrAgencies,
  onClear,
}: SearchByCbbrMenuProps) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const cbbrPolicyAreaId = searchParams.get(
    "cbbrPolicyAreaId",
  ) as CommunityBoardBudgetRequestPolicyAreaId;
  const cbbrNeedGroupId = searchParams.get(
    "cbbrNeedGroupId",
  ) as CommunityBoardBudgetRequestNeedGroupId;
  const cbbrAgencyInitials = searchParams.get(
    "cbbrAgencyInitials",
  ) as CommunityBoardBudgetRequestAgencyInitials;

  const appliedFilters: number[] = [
    cbbrPolicyAreaId !== null ? 1 : 0,
    cbbrNeedGroupId !== null ? 1 : 0,
    cbbrAgencyInitials !== null ? 1 : 0,
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
      marginX={2}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton
            aria-label="Close search by attribute menu"
            paddingY={0}
            paddingX={3}
          >
            <Heading
              flex="1"
              textAlign="left"
              fontSize="xs"
              fontWeight="bold"
              lineHeight="32px"
              paddingBottom={0}
            >
              {`${isExpanded ? "Hide" : "Show"} Filters (${appliedFilters.reduce((acc, curr) => acc + curr, 0)})`}
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
            <CommunityBoardBudgetRequestPolicyAreaDropdown
              selectValue={cbbrPolicyAreaId}
              cbbrPolicyAreas={cbbrPolicyAreas}
              onSelectValueChange={(value) => {
                updateSearchParams({ cbbrPolicyAreaId: value });
              }}
            />
            <CommunityBoardBudgetRequestNeedGroupDropdown
              selectValue={cbbrNeedGroupId}
              cbbrNeedGroups={cbbrNeedGroups}
              onSelectValueChange={(value) => {
                updateSearchParams({ cbbrNeedGroupId: value });
              }}
            />
            <CommunityBoardBudgetRequestAgencyDropdown
              selectValue={cbbrAgencyInitials}
              cbbrAgencies={cbbrAgencies}
              onSelectValueChange={(value) => {
                updateSearchParams({ cbbrAgencyInitials: value });
              }}
            />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
