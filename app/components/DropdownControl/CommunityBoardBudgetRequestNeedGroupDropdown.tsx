import { CommunityBoardBudgetRequestNeedGroup } from "../../gen";
import { DropdownControlProps, DropdownControl } from ".";

export interface CommunityBoardBudgetRequestNeedGroupProps
  extends Pick<DropdownControlProps, "selectValue" | "onSelectValueChange"> {
  cbbrNeedGroups: Array<CommunityBoardBudgetRequestNeedGroup> | null;
}

export function CommunityBoardBudgetRequestNeedGroupDropdown({
  selectValue,
  cbbrNeedGroups,
  onSelectValueChange,
}: CommunityBoardBudgetRequestNeedGroupProps) {
  const cbbrNeedGroupOptions = cbbrNeedGroups?.map((cbbrNeedGroup) => (
    <option key={cbbrNeedGroup.id} value={cbbrNeedGroup.id}>
      {cbbrNeedGroup.description}
    </option>
  ));
  return (
    <DropdownControl
      formId="cbbrNeedGroup"
      formLabel="Needs Group"
      isSelectDisabled={cbbrNeedGroups === null}
      selectValue={selectValue}
      onSelectValueChange={onSelectValueChange}
      fontWeight="700"
      placeholder="--All need groups--"
      marginBottom={4}
    >
      {cbbrNeedGroupOptions}
    </DropdownControl>
  );
}
