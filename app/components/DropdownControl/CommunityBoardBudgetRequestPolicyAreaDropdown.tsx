import { CommunityBoardBudgetRequestPolicyArea } from "../../gen";
import { DropdownControlProps, DropdownControl } from ".";
import { CommunityBoardBudgetRequestPolicyAreaId } from "../../utils/types";

export interface CommunityBoardBudgetRequestPolicyAreaProps
  extends Pick<DropdownControlProps, "selectValue" | "onSelectValueChange"> {
  cbbrPolicyAreas: Array<CommunityBoardBudgetRequestPolicyArea> | null;
}

export function CommunityBoardBudgetRequestPolicyAreaDropdown({
  selectValue,
  cbbrPolicyAreas,
  onSelectValueChange,
}: CommunityBoardBudgetRequestPolicyAreaProps) {
  const cbbrPolicyAreaOptions = cbbrPolicyAreas?.map((cbbrPolicyArea) => (
    <option key={cbbrPolicyArea.id} value={cbbrPolicyArea.id}>
      {cbbrPolicyArea.description}
    </option>
  ));

  return (
    <DropdownControl
      formId="cbbrPolicyArea"
      formLabel="Policy Area"
      isSelectDisabled={cbbrPolicyAreas === null}
      selectValue={selectValue}
      onSelectValueChange={onSelectValueChange}
      fontWeight="700"
      placeholder="--All areas--"
      marginBottom={4}
    >
      {cbbrPolicyAreaOptions}
    </DropdownControl>
  );
}
