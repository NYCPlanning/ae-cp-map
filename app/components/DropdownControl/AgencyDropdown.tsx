import { Agency } from "~/gen";
import { DropdownControlProps, DropdownControl } from ".";
import { ManagingAgencyAcronym } from "../../utils/types";

export interface AgencyDropdownProps
  extends Pick<DropdownControlProps, "selectValue"> {
  agencies: Array<Agency> | null;
  onSelectValueChange?: (value: null | string) => void;
}
export function AgencyDropdown({
  selectValue,
  agencies,
  onSelectValueChange = () => null,
}: AgencyDropdownProps) {
  const updateManagingAgencyAcronym = (
    nextManagingAgencyAcronym: ManagingAgencyAcronym,
  ) => {
    onSelectValueChange(nextManagingAgencyAcronym);
  };

  const agencyOptions = agencies?.map((agency) => (
    <option key={agency.initials} value={agency.initials}>
      {agency.name} ({agency.initials})
    </option>
  ));
  return (
    <DropdownControl
      formId="managingAgency"
      formLabel="Managing Agency"
      isSelectDisabled={agencies === null}
      selectValue={selectValue}
      onSelectValueChange={updateManagingAgencyAcronym}
      fontWeight="700"
      placeholder="--All agencies--"
      marginBottom={4}
    >
      {agencyOptions}
    </DropdownControl>
  );
}
