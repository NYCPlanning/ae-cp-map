// import { Agency } from "/gen";
import { Agency } from "../../gen"; // remove this and uncomment line 1 before merging
import { DropdownControlProps, DropdownControl } from ".";
import { ManagingAgencyInitials } from "../../utils/types";

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
      onSelectValueChange={(nextManagingAgencyInitials) => {
        if (typeof nextManagingAgencyInitials !== "string")
          throw new Error("Unexpected agency initials type. Expected string");
        onSelectValueChange(nextManagingAgencyInitials);
      }}
      fontWeight="700"
      placeholder="--All agencies--"
      marginBottom={4}
    >
      {agencyOptions}
    </DropdownControl>
  );
}
