import { CommunityBoardBudgetRequestAgencyCategoryResponse } from "../../gen";
import { CbbrCheckboxGroup } from "./CbbrCheckboxGroup";
import { CommunityBoardBudgetRequestAgencyCategoryResponseId } from "../../utils/types";
import { CbbrCheckbox } from "./CbbrCheckbox";

export interface CommunityBoardBudgetRequestAgencyCategoryResponseProps {
  cbbrAgencyCategoryResponses: Array<CommunityBoardBudgetRequestAgencyCategoryResponse> | null;
  selectedIds: Array<CommunityBoardBudgetRequestAgencyCategoryResponseId>;
  onCheckedChange: (
    value: CommunityBoardBudgetRequestAgencyCategoryResponseId,
  ) => void;
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
        const id = String(cbbrACR.id);
        const isChecked = selectedIds.includes(id);

        return (
          <CbbrCheckbox
            key={id}
            checkboxValue={id}
            checkboxLabel={cbbrACR.description}
            isChecked={isChecked}
            onCheckedChange={(value, checked) => {
              if (checked) {
                onCheckedChange(
                  value as CommunityBoardBudgetRequestAgencyCategoryResponseId,
                );
              } else {
                onCheckedChange(null);
              }
            }}
          />
        );
      })}
    </CbbrCheckboxGroup>
  );
}
