import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import { AgencyDropdown, ProjectTypeDropdown } from "./DropdownControl";
import { ProjectAmountMenu } from "./ProjectAmountMenu";
import { ClearFilterBtn } from "./ClearFilter";
import {
  ManagingAgencyInitials,
  AgencyBudgetType,
  CommitmentsTotalMax,
  CommitmentsTotalMin,
  QueryParams,
} from "../utils/types";
import { useUpdateSearchParams } from "~/utils/utils";
import { Agency, AgencyBudget } from "~/gen";
import { env } from "~/utils/env";

export const SearchByAttributeMenu = ({
  agencies,
  projectTypes,
  onClear,
}: SearchByAttributeMenuProps) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const managingAgency = searchParams.get(
    "managingAgency",
  ) as ManagingAgencyInitials;
  const agencyBudget = searchParams.get("agencyBudget") as AgencyBudgetType;
  const commitmentsTotalMin = searchParams.get(
    "commitmentsTotalMin",
  ) as CommitmentsTotalMin;
  const commitmentsTotalMax = searchParams.get(
    "commitmentsTotalMax",
  ) as CommitmentsTotalMax;

  const appliedFilters: number[] = [
    managingAgency !== null ? 1 : 0,
    agencyBudget !== null ? 1 : 0,
    commitmentsTotalMin !== null || commitmentsTotalMax !== null ? 1 : 0,
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
      marginX={env.facDbPhase1 == "ON" ? 0 : 2}
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
            <AgencyDropdown
              selectValue={managingAgency}
              agencies={agencies}
              onSelectValueChange={(value) => {
                updateSearchParams({ managingAgency: value });
              }}
            />
            <ProjectTypeDropdown
              selectValue={agencyBudget}
              projectTypes={projectTypes}
              onSelectValueChange={(value) => {
                updateSearchParams({ agencyBudget: value });
              }}
            />
            <ProjectAmountMenu
              commitmentsTotalMin={commitmentsTotalMin}
              commitmentsTotalMax={commitmentsTotalMax}
              onValidChange={(changes: QueryParams) => {
                updateSearchParams(changes);
              }}
            />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export interface SearchByAttributeMenuProps {
  agencies: Array<Agency> | null;
  projectTypes: Array<AgencyBudget> | null;
  onClear: () => void;
}
