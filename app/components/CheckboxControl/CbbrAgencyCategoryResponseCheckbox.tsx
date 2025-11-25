import { CommunityBoardBudgetRequestAgencyCategoryResponse } from "../../gen";
import { CbbrCheckboxGroup } from "./CbbrCheckboxGroup";
import { CommunityBoardBudgetRequestAgencyCategoryResponseId } from "../../utils/types";
import { CbbrCheckbox } from "./CbbrCheckbox";

export interface CommunityBoardBudgetRequestAgencyCategoryResponseProps {
  cbbrAgencyCategoryResponses: Array<CommunityBoardBudgetRequestAgencyCategoryResponse> | null;
  selectedIds: Array<number> | null;
  onCheckedChange: (value: number) => void;
}

export function CbbrAgencyCategoryResponseCheckbox({
  cbbrAgencyCategoryResponses,
  selectedIds,
  onCheckedChange,
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
          selectedIds === null ? false : selectedIds.includes(id);

        return (
          <CbbrCheckbox
            key={id}
            checkboxValue={id}
            checkboxLabel={cbbrACR.description}
            isChecked={isChecked}
            onCheckedChange={(value) => {
              if (typeof value !== "number")
                throw new Error(
                  "Unexpected category response id type. Expected number.",
                );
              onCheckedChange(value);
            }}
          />
        );
      })}
    </CbbrCheckboxGroup>
  );
}
