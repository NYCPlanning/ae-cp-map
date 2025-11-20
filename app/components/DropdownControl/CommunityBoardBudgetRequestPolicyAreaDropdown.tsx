import { CommunityBoardBudgetRequestPolicyArea } from "../../gen";
import { DropdownControlProps, DropdownControl } from ".";
import { CommunityBoardBudgetRequestPolicyAreaId } from "../../utils/types";

export interface CommunityBoardBudgetRequestPolicyAreaProps
  extends Pick<DropdownControlProps, "selectValue"> {
  cbbrPolicyAreas: Array<CommunityBoardBudgetRequestPolicyArea> | null;
  onSelectValueChange?: (value: null | string) => void;
}

export function CommunityBoardBudgetRequestPolicyAreaDropdown({
  selectValue,
  cbbrPolicyAreas,
  onSelectValueChange = () => null,
}: CommunityBoardBudgetRequestPolicyAreaProps) {
  const updateCbbrPolicyArea = (
    nextCbbrPolicyAreaId: CommunityBoardBudgetRequestPolicyAreaId,
  ) => {
    onSelectValueChange(nextCbbrPolicyAreaId);
  };

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
      onSelectValueChange={updateCbbrPolicyArea}
      fontWeight="700"
      placeholder="--All areas--"
      marginBottom={4}
    >
      {cbbrPolicyAreaOptions}
    </DropdownControl>
  );
}
