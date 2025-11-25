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
  CommunityBoardBudgetRequestAgencyCategoryResponse,
  CommunityBoardBudgetRequestNeedGroup,
  CommunityBoardBudgetRequestPolicyArea,
} from "../gen";
import {
  CommunityBoardBudgetRequestAgencyCategoryResponseId,
  CommunityBoardBudgetRequestAgencyInitials,
  CommunityBoardBudgetRequestNeedGroupId,
  CommunityBoardBudgetRequestPolicyAreaId,
} from "../utils/types";
import { ClearFilterBtn } from "./ClearFilter";
import {
  CommunityBoardBudgetRequestPolicyAreaDropdown,
  CommunityBoardBudgetRequestNeedGroupDropdown,
  CommunityBoardBudgetRequestAgencyDropdown,
} from "./DropdownControl";
import { CbbrAgencyCategoryResponseCheckbox } from "./CheckboxControl";
import { SEARCH_PARAMS } from "~/utils/params";

export interface SearchByCbbrMenuProps {
  cbbrPolicyAreas: Array<CommunityBoardBudgetRequestPolicyArea> | null;
  cbbrNeedGroups: Array<CommunityBoardBudgetRequestNeedGroup> | null;
  cbbrAgencies: Array<Agency> | null;
  cbbrAgencyCategoryResponses: Array<CommunityBoardBudgetRequestAgencyCategoryResponse> | null;
  onClear: () => void;
}

export const SearchByCbbrMenu = ({
  cbbrPolicyAreas,
  cbbrNeedGroups,
  cbbrAgencies,
  cbbrAgencyCategoryResponses,
  onClear,
}: SearchByCbbrMenuProps) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const cbbrPolicyAreaIdParam = searchParams.get(
    SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.POLICY_AREA_ID.KEY,
  );
  const cbbrPolicyAreaId =
    SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.POLICY_AREA_ID.PARSER(
      cbbrPolicyAreaIdParam,
    );
  const cbbrNeedGroupIdParam = searchParams.get(
    SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.NEED_GROUP_ID.KEY,
  );
  const cbbrNeedGroupId =
    SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.NEED_GROUP_ID.PARSER(
      cbbrNeedGroupIdParam,
    );
  const cbbrAgencyInitialsParam = searchParams.get(
    SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.AGENCY_INITIALS.KEY,
  );
  const cbbrAgencyInitials =
    SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.AGENCY_INITIALS.PARSER(
      cbbrAgencyInitialsParam,
    );
  const cbbrAgencyCategoryResponseIdsParam = searchParams.get(
    SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST
      .AGENCY_RESPONSE_CATEGORY_IDS.KEY,
  );
  const cbbrAgencyCategoryResponseIds =
    SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.AGENCY_RESPONSE_CATEGORY_IDS.PARSER(
      cbbrAgencyCategoryResponseIdsParam,
    );

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
                if (typeof value !== "number")
                  throw new Error(
                    "Unexpected policy area type. Expected number.",
                  );
                updateSearchParams({
                  [SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST
                    .POLICY_AREA_ID.KEY]: value,
                });
              }}
            />
            <CommunityBoardBudgetRequestNeedGroupDropdown
              selectValue={cbbrNeedGroupId}
              cbbrNeedGroups={cbbrNeedGroups}
              onSelectValueChange={(value) => {
                if (typeof value !== "number")
                  throw new Error(
                    "Unexpected need group type. Expected number.",
                  );
                updateSearchParams({
                  [SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST
                    .NEED_GROUP_ID.KEY]: value,
                });
              }}
            />
            <CommunityBoardBudgetRequestAgencyDropdown
              selectValue={cbbrAgencyInitials}
              cbbrAgencies={cbbrAgencies}
              onSelectValueChange={(value) => {
                if (typeof value !== "string")
                  throw new Error(
                    "Unexpected agency initials type. Expected string.",
                  );
                updateSearchParams({
                  [SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST
                    .AGENCY_INITIALS.KEY]: value,
                });
              }}
            />
            <CbbrAgencyCategoryResponseCheckbox
              cbbrAgencyCategoryResponses={cbbrAgencyCategoryResponses}
              selectedIds={cbbrAgencyCategoryResponseIds}
              onCheckedChange={(value) => {
                let nextValue;
                if (cbbrAgencyCategoryResponseIds === null) {
                  nextValue = [value];
                } else if (cbbrAgencyCategoryResponseIds.includes(value)) {
                  const removedValue = cbbrAgencyCategoryResponseIds.filter(
                    (item) => item !== value,
                  );
                  nextValue =
                    removedValue.length === 0 ? undefined : removedValue;
                } else {
                  nextValue = cbbrAgencyCategoryResponseIds.concat([value]);
                }
                updateSearchParams({
                  [SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST
                    .AGENCY_RESPONSE_CATEGORY_IDS.KEY]: nextValue,
                });
              }}
            />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};
