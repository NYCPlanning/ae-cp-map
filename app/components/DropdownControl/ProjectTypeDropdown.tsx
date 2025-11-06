import { AgencyBudget } from "~/gen";
import { DropdownControlProps, DropdownControl } from ".";
import { AgencyBudgetType } from "../../utils/types";
import { analytics } from "../../utils/analytics";

export interface ProjectTypeDropdownProps
  extends Pick<DropdownControlProps, "selectValue"> {
  projectTypes: Array<AgencyBudget> | null;
  onSelectValueChange?: (value: null | string) => void;
}
export function ProjectTypeDropdown({
  selectValue,
  projectTypes,
  onSelectValueChange = () => null,
}: ProjectTypeDropdownProps) {
  const updateProjectType = (nextProjectType: AgencyBudgetType) => {
    analytics({
      category: "Dropdown Menu",
      action: "Change Project Type",
      name: nextProjectType,
    });

    onSelectValueChange(nextProjectType);
  };

  const projectTypeOptions = projectTypes
    ?.sort((a, b) => a.type.localeCompare(b.type))
    .map((projectType) => (
      <option key={projectType.type} value={projectType.code}>
        {projectType.type}
      </option>
    ));
  return (
    <DropdownControl
      formId="projectType"
      formLabel="Project Type"
      isSelectDisabled={projectTypes === null}
      selectValue={selectValue}
      onSelectValueChange={updateProjectType}
      fontWeight="700"
      placeholder="--All areas--"
      marginBottom={4}
    >
      {projectTypeOptions}
    </DropdownControl>
  );
}
