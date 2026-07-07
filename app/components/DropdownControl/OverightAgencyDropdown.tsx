import { Agency } from "../../gen";
import { DropdownControl, DropdownControlProps } from ".";
import { FacilityOversightAgency } from "../../utils/types";

export interface OversightAgencyDropdownProps
  extends Pick<DropdownControlProps, "selectValue"> {
  agencies: Agency[] | null;
  onSelectValueChange?: (value: FacilityOversightAgency) => void;
}

export function OversightAgencyDropdown({
  selectValue,
  agencies,
  onSelectValueChange = () => null,
}: OversightAgencyDropdownProps) {
  const updateFacilityAgency = (
    nextFacilityAgency: FacilityOversightAgency,
  ) => {
    onSelectValueChange(nextFacilityAgency);
  };

  const agencyOptions = agencies?.map((agency) => (
    <option key={agency.initials} value={agency.initials}>
      {agency.name} ({agency.initials})
    </option>
  ));

  return (
    <DropdownControl
      formId="facilityOversightAgency"
      formLabel="Oversight Agency"
      isSelectDisabled={agencies === null}
      selectValue={selectValue}
      onSelectValueChange={updateFacilityAgency}
      fontWeight="700"
      placeholder="All agencies"
      marginBottom={4}
    >
      {agencyOptions}
    </DropdownControl>
  );
}
