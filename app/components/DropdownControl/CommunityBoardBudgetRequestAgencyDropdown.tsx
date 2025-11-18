import { Agency } from "../../gen";
import { CommunityBoardBudgetRequestAgencyInitials } from "~/utils/types";
import { DropdownControlProps, DropdownControl } from ".";

export interface CommunityBoardBudgetRequestAgencyProps
  extends Pick<DropdownControlProps, "selectValue"> {
  cbbrAgencies: Array<Agency> | null;
  cbbrAgencyInitials?: string | null;
  onSelectValueChange?: (value: null | string) => void;
}

export function CommunityBoardBudgetRequestAgencyDropdown({
  selectValue,
  cbbrAgencies,
  onSelectValueChange = () => null,
}: CommunityBoardBudgetRequestAgencyProps) {
  const updateCbbrAgencyInitials = (
    nextCbbrAgencyInitials: CommunityBoardBudgetRequestAgencyInitials,
  ) => {
    onSelectValueChange(nextCbbrAgencyInitials);
  };

  const cbbrAgencyOptions = cbbrAgencies?.map((cbbrAgency) => (
    <option key={cbbrAgency.initials} value={cbbrAgency.initials}>
      {cbbrAgency.name} ({cbbrAgency.initials})
    </option>
  ));
  return (
    <DropdownControl
      formId="cbbrAgency"
      formLabel="Agency"
      isSelectDisabled={cbbrAgencies === null}
      selectValue={selectValue}
      onSelectValueChange={updateCbbrAgencyInitials}
      fontWeight="700"
      placeholder="--All agencies--"
      marginBottom={4}
    >
      {cbbrAgencyOptions}
    </DropdownControl>
  );
}
