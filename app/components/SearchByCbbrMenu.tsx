import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import {
  useUpdateSearchParams,
  useDismissWelcomeAndUpdateSearchParams,
} from "../utils/utils";
import {
  Agency,
  CommunityBoardBudgetRequestAgencyCategoryResponse,
  CommunityBoardBudgetRequestNeedGroup,
  CommunityBoardBudgetRequestPolicyArea,
} from "../gen";
import {
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
import { useStore } from "~/store";

export interface SearchByCbbrMenuProps {
  cbbrPolicyAreas: Array<CommunityBoardBudgetRequestPolicyArea> | null;
  cbbrNeedGroups: Array<CommunityBoardBudgetRequestNeedGroup> | null;
  cbbrAgencies: Array<Agency> | null;
  cbbrAgencyCategoryResponses: Array<CommunityBoardBudgetRequestAgencyCategoryResponse> | null;
  onClear: () => void;
  updateFiltersAccordion: () => void;
}

export const SearchByCbbrMenu = ({
  cbbrPolicyAreas,
  cbbrNeedGroups,
  cbbrAgencies,
  cbbrAgencyCategoryResponses,
  onClear,
  updateFiltersAccordion,
}: SearchByCbbrMenuProps) => {
  const [searchParams] = useUpdateSearchParams();
  const dismissWelcomeAndUpdateSearchParams =
    useDismissWelcomeAndUpdateSearchParams();
  const cbbrPolicyAreaId = searchParams.get(
    "cbbrPolicyAreaId",
  ) as CommunityBoardBudgetRequestPolicyAreaId;
  const cbbrNeedGroupId = searchParams.get(
    "cbbrNeedGroupId",
  ) as CommunityBoardBudgetRequestNeedGroupId;
  const cbbrAgencyInitials = searchParams.get(
    "cbbrAgencyInitials",
  ) as CommunityBoardBudgetRequestAgencyInitials;
  const cbbrAgencyCategoryResponseIds = useStore(
    (state) => state.cbbrAgencyCategoryResponseCheckboxes,
  )
    .filter((cb) => cb.checked === true)
    .map((cb) => cb.id);
  const updateCbbrAgencyCategoryResponseCheckboxById = useStore(
    (state) => state.updateCbbrAgencyCategoryResponseCheckboxById,
  );

  const appliedFilters: number[] = [
    cbbrPolicyAreaId !== null ? 1 : 0,
    cbbrNeedGroupId !== null ? 1 : 0,
    cbbrAgencyInitials !== null ? 1 : 0,
    cbbrAgencyCategoryResponseIds !== null &&
    cbbrAgencyCategoryResponses !== null &&
    cbbrAgencyCategoryResponseIds.length < cbbrAgencyCategoryResponses.length
      ? cbbrAgencyCategoryResponseIds.length
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
        aria-label="Close search by attribute menu"
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
        <CommunityBoardBudgetRequestPolicyAreaDropdown
          selectValue={cbbrPolicyAreaId}
          cbbrPolicyAreas={cbbrPolicyAreas}
          onSelectValueChange={(value) => {
            dismissWelcomeAndUpdateSearchParams(
              "/community-board-budget-requests",
              { cbbrPolicyAreaId: value },
            );
          }}
        />
        <CommunityBoardBudgetRequestNeedGroupDropdown
          selectValue={cbbrNeedGroupId}
          cbbrNeedGroups={cbbrNeedGroups}
          onSelectValueChange={(value) => {
            dismissWelcomeAndUpdateSearchParams(
              "/community-board-budget-requests",
              { cbbrNeedGroupId: value },
            );
          }}
        />
        <CommunityBoardBudgetRequestAgencyDropdown
          selectValue={cbbrAgencyInitials}
          cbbrAgencies={cbbrAgencies}
          onSelectValueChange={(value) => {
            dismissWelcomeAndUpdateSearchParams(
              "/community-board-budget-requests",
              { cbbrAgencyInitials: value },
            );
          }}
        />
        <CbbrAgencyCategoryResponseCheckbox
          onCheckedChange={(value) => {
            if (value === null)
              throw new Error(
                "Unexpected null for agency category response id",
              );
            let nextValue: Array<number> | null;
            if (cbbrAgencyCategoryResponseIds === null) {
              nextValue = [parseInt(value)];
            } else if (
              cbbrAgencyCategoryResponseIds.includes(parseInt(value))
            ) {
              const removedValue = cbbrAgencyCategoryResponseIds.filter(
                (item) => item !== parseInt(value),
              );
              nextValue = removedValue.length === 0 ? null : removedValue;
            } else {
              nextValue = cbbrAgencyCategoryResponseIds.concat([
                parseInt(value),
              ]);
            }
            updateCbbrAgencyCategoryResponseCheckboxById(parseInt(value));
            dismissWelcomeAndUpdateSearchParams(
              "/community-board-budget-requests",
              {
                cbbrAgencyCategoryResponseIds:
                  nextValue === null ||
                  nextValue.length === cbbrAgencyCategoryResponses?.length
                    ? null
                    : String(nextValue),
              },
            );
          }}
          dismissWelcomeAndUpdateSearchParams={
            dismissWelcomeAndUpdateSearchParams
          }
        />
      </AccordionPanel>
    </AccordionItem>
  );
};
