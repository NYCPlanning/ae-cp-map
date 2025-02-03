import { Agency } from "~/gen";
import { AdminDropdownProps, AdminDropdown } from ".";
import {
  AttributeParams,
  ManagingAgencyAcronym,
  ProjectTypeCode,
  AmountMin,
  AmountMax,
} from "~/utils/types";
import { analytics } from "../../utils/analytics";
import { useSearchParams } from "@remix-run/react";

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

    const projectType = searchParams.get("projectType") as ProjectTypeCode;
    const min = searchParams.get("min") as AmountMin;
    const max = searchParams.get("max") as AmountMax;

    setAttributeParams({
      managingAgency: nextManagingAgencyAcronym,
      projectType,
      min,
      max,
    });
  };

  const [searchParams, setSearchParams] = useSearchParams();

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
