import { Agency } from "~/gen";
import { AdminDropdownProps, AdminDropdown } from ".";
import { AttributeParams, ManagingAgencyAcronym } from "~/utils/types";
import { analytics } from "../../utils/analytics";

export interface AgencyDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  agencies: Array<Agency> | null;
  setAttributeParams: (value: AttributeParams) => void;
}
export function AgencyDropdown({
  selectValue,
  agencies,
  setAttributeParams,
}: AgencyDropdownProps) {
  const updateManagingAgencyAcronym = (
    nextManagingAgencyAcronym: ManagingAgencyAcronym,
  ) => {
    analytics({
      category: "Dropdown Menu",
      action: "Change Managing Agency",
      name: nextManagingAgencyAcronym,
    });

    setAttributeParams({
      managingAgency: nextManagingAgencyAcronym,
    });
  };

  const agencyOptions = agencies
    ?.sort((a, b) => a.name.localeCompare(b.name))
    .map((agency) => (
      <option key={agency.initials} value={agency.initials}>
        {agency.name} ({agency.initials})
      </option>
    ));
  return (
    <AdminDropdown
      formId="managingAgency"
      formLabel="Managing Agency"
      isSelectDisabled={agencies === null}
      selectValue={selectValue}
      onSelectValueChange={updateManagingAgencyAcronym}
    >
      {agencyOptions}
    </AdminDropdown>
  );
}
