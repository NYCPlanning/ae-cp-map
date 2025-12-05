import { CommunityBoardBudgetRequestAgencyCategoryResponse } from "../../gen";
import { CbbrCheckboxGroup } from "./CbbrCheckboxGroup";
import { CommunityBoardBudgetRequestAgencyCategoryResponseId } from "../../utils/types";
import { CbbrCheckbox } from ".";

export interface CommunityBoardBudgetRequestAgencyCategoryResponseProps {
  cbbrAgencyCategoryResponses: Array<CommunityBoardBudgetRequestAgencyCategoryResponse> | null;
  selectedIds: Array<CommunityBoardBudgetRequestAgencyCategoryResponseId>;
  isChecked?: boolean;
  onCheckedChange: (
    value: CommunityBoardBudgetRequestAgencyCategoryResponseId,
  ) => void;
}

export function CbbrAgencyCategoryResponseCheckbox({
  cbbrAgencyCategoryResponses,
  selectedIds,
  onCheckedChange = () => null,
}: CommunityBoardBudgetRequestAgencyCategoryResponseProps) {
  return (
    <CbbrCheckboxGroup
      formId="agencyCatergoryResponse"
      formLabel="Agency Response"
      fontWeight="700"
      marginBottom={2}
      fontSize={"xs"}
    >
      {cbbrAgencyCategoryResponses?.map((cbbrACR) => {
        const id = String(cbbrACR.id);
        const isChecked = selectedIds.includes(id);

        return (
          <CbbrCheckbox
            key={id}
            checkboxValue={id}
            checkboxLabel={cbbrACR.description}
            isChecked={isChecked}
            onCheckedChange={(value) => {
              onCheckedChange(String(value));
            }}
          />
        );
      })}
    </CbbrCheckboxGroup>
  );
}
