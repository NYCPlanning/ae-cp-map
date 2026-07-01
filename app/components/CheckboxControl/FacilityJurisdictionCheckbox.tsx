import { FilterCheckboxGroup } from "./FilterCheckboxGroup";
import { FacilityJurisdiction } from "../../utils/types";
import { FilterCheckbox } from ".";
import { useStore } from "~/store";

export interface FacilityJurisdictionProps {
  onCheckedChange: (value: FacilityJurisdiction | null) => void;
}

export function FacilityJurisdictionCheckbox({
  onCheckedChange = () => null,
}: FacilityJurisdictionProps) {
  const facilityJurisdictionCheckboxes = useStore(
    (state) => state.facilityJurisdictionCheckboxes,
  );

  return (
    <FilterCheckboxGroup
      formId="facilityJurisdiction"
      formLabel="Facility Jurisdiction"
      fontWeight="700"
      marginBottom={4}
      fontSize={"xs"}
      tooltip={"The government level that oversees the facility."}
    >
      {facilityJurisdictionCheckboxes.map((facilityJurisdiction) => {
        return (
          <FilterCheckbox
            key={facilityJurisdiction.id}
            checkboxValue={facilityJurisdiction.id}
            checkboxLabel={facilityJurisdiction.id}
            isChecked={facilityJurisdiction.checked}
            onCheckedChange={(value) => {
              onCheckedChange(value as FacilityJurisdiction);
            }}
          />
        );
      })}
    </FilterCheckboxGroup>
  );
}
