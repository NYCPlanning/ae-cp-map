import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@nycplanning/streetscape";
import { AgencyDropdown, ProjectTypeDropdown } from "./AdminDropdown";
import { ProjectAmountMenu } from "./ProjectAmountMenu";
import { ClearFilterBtn } from "./ClearFilter";
import {
  ManagingAgencyAcronym,
  AgencyBudgetType,
  CommitmentsTotalMax,
  CommitmentsTotalMin,
  QueryParams,
} from "../utils/types";
import { useUpdateSearchParams } from "~/utils/utils";
import { Agency, AgencyBudget } from "~/gen";
import { analyticsTrackSearchByAttributeToggle } from "~/utils/analytics";

export const SearchByAttributeMenu = ({
  agencies,
  projectTypes,
  onClear,
}: SearchByAttributeMenuProps) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();

  const managingAgency = searchParams.get(
    "managingAgency",
  ) as ManagingAgencyAcronym;
  const agencyBudget = searchParams.get("agencyBudget") as AgencyBudgetType;
  const commitmentsTotalMin = searchParams.get(
    "commitmentsTotalMin",
  ) as CommitmentsTotalMin;
  const commitmentsTotalMax = searchParams.get(
    "commitmentsTotalMax",
  ) as CommitmentsTotalMax;

  return (
    <AccordionItem>
      <AccordionButton aria-label="Close search by attribute menu" p={0}>
        <Heading
          flex="1"
          textAlign="left"
          fontSize="md"
          fontWeight="bold"
          lineHeight="32px"
          pb={0}
        >
          Search by Attribute
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel px={0} display={"flex"} flexDirection={"column"} gap={1}>
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
        <ClearFilterBtn onClear={onClear} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export interface SearchByAttributeMenuProps {
  agencies: Array<Agency> | null;
  projectTypes: Array<AgencyBudget> | null;
  onClear: () => void;
}
