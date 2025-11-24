import { CommunityBoardBudgetRequestAgencyCategoryResponse } from "../../gen";
import { CbbrCheckboxGroup } from "./CbbrCheckboxGroup";
import { CommunityBoardBudgetRequestAgencyCategoryResponseId } from "../../utils/types";
import { CbbrCheckbox } from "./CbbrCheckbox";

export interface CommunityBoardBudgetRequestAgencyCategoryResponseProps {
  cbbrAgencyCategoryResponses: Array<CommunityBoardBudgetRequestAgencyCategoryResponse> | null;
  selectedIds?: Array<number>;
  onCheckedChange: (value: number) => void;
}

export function CbbrAgencyCategoryResponseCheckbox({
  cbbrAgencyCategoryResponses,
  selectedIds,
  onCheckedChange = () => null,
}: CommunityBoardBudgetRequestAgencyCategoryResponseProps) {
  console.debug("cbbrAgencyCategoryResponses", cbbrAgencyCategoryResponses);

  return (
    <CbbrCheckboxGroup
      formId="agencyCatergoryResponse"
      formLabel="Agency Response"
      fontWeight="700"
      marginBottom={2}
    >
      {cbbrAgencyCategoryResponses?.map((cbbrACR) => {
        const id = cbbrACR.id;
        const isChecked =
          selectedIds === undefined ? false : selectedIds.includes(id);

        return (
          <CbbrCheckbox
            key={id}
            checkboxValue={id}
            checkboxLabel={cbbrACR.description}
            isChecked={isChecked}
            onCheckedChange={(value, checked) => {
              onCheckedChange(value as number);
            }}
          />
        );
      })}
    </CbbrCheckboxGroup>
  );
}
