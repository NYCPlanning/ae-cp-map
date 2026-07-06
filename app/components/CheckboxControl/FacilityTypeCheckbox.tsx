import { FilterCheckboxGroup } from "./FilterCheckboxGroup";
import { FacilityType } from "../../utils/types";
import { FilterCheckbox } from ".";
import { useStore } from "~/store";

export interface FacilityTypeProps {
  onCheckedChange: (value: FacilityType | null) => void;
}

export function FacilityTypeCheckbox({
  onCheckedChange = () => null,
}: FacilityTypeProps) {
  const facilityTypeCheckboxes = useStore(
    (state) => state.facilityTypeCheckboxes,
  );

  return (
    <FilterCheckboxGroup
      formId="facilityType"
      formLabel="Facility Type"
      fontWeight="700"
      marginBottom={4}
      fontSize={"xs"}
      tooltip={"The type of entity operating the facility."}
    >
      {facilityTypeCheckboxes.map((facilityType) => {
        return (
          <FilterCheckbox
            key={facilityType.name}
            checkboxValue={facilityType.name}
            checkboxLabel={facilityType.name}
            isChecked={facilityType.checked}
            onCheckedChange={(value) => {
              onCheckedChange(value as FacilityType);
            }}
          />
        );
      })}
    </FilterCheckboxGroup>
  );
}
