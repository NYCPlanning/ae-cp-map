import { CommunityBoardBudgetRequestNeedGroup } from "../../gen";
import { CommunityBoardBudgetRequestNeedGroupId } from "~/utils/types";
import { DropdownControlProps, DropdownControl } from ".";

export interface CommunityBoardBudgetRequestNeedGroupProps
  extends Pick<DropdownControlProps, "selectValue"> {
  cbbrNeedGroups: Array<CommunityBoardBudgetRequestNeedGroup> | null;
  id?: number | null;
  onSelectValueChange?: (value: null | string) => void;
}

export function CommunityBoardBudgetRequestNeedGroupDropdown({
  selectValue,
  cbbrNeedGroups,
  onSelectValueChange = () => null,
}: CommunityBoardBudgetRequestNeedGroupProps) {
  const updateCbbrNeedGroup = (
    nextCbbrNeedGroupId: CommunityBoardBudgetRequestNeedGroupId,
  ) => {
    onSelectValueChange(nextCbbrNeedGroupId);
  };

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
      onSelectValueChange={updateCbbrNeedGroup}
      fontWeight="700"
      placeholder="--All need groups--"
      marginBottom={4}
    >
      {cbbrNeedGroupOptions}
    </DropdownControl>
  );
}
