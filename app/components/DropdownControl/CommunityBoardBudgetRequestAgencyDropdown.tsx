import { Agency } from "../../gen";
import { CommunityBoardBudgetRequestAgencyInitials } from "../../utils/types";
import { DropdownControlProps, DropdownControl } from ".";

export interface CommunityBoardBudgetRequestAgencyProps
  extends Pick<DropdownControlProps, "selectValue" | "onSelectValueChange"> {
  cbbrAgencies: Array<Agency> | null;
}

export function CommunityBoardBudgetRequestAgencyDropdown({
  selectValue,
  cbbrAgencies,
  onSelectValueChange,
}: CommunityBoardBudgetRequestAgencyProps) {
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
      onSelectValueChange={onSelectValueChange}
      fontWeight="700"
      placeholder="--All agencies--"
      marginBottom={4}
    >
      {cbbrAgencyOptions}
    </DropdownControl>
  );
}
