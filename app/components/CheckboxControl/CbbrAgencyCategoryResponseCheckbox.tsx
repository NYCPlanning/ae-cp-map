import { CommunityBoardBudgetRequestAgencyCategoryResponse } from "../../gen";
import { CbbrCheckboxGroup } from "./CbbrCheckboxGroup";
import {
  CommunityBoardBudgetRequestAgencyCategoryResponseId,
  QueryParams,
} from "../../utils/types";
import { CbbrCheckbox } from ".";

export interface CommunityBoardBudgetRequestAgencyCategoryResponseProps {
  cbbrAgencyCategoryResponses: Array<CommunityBoardBudgetRequestAgencyCategoryResponse> | null;
  selectedIds: Array<CommunityBoardBudgetRequestAgencyCategoryResponseId>;
  isChecked?: boolean;
  onCheckedChange: (
    value: CommunityBoardBudgetRequestAgencyCategoryResponseId,
  ) => void;
  dismissWelcomeAndUpdateSearchParams: (
    newPath: string,
    changes: QueryParams,
  ) => void;
  setNoAgencyCategoryResponseTypesSelected: (value: boolean) => void;
}

export function CbbrAgencyCategoryResponseCheckbox({
  cbbrAgencyCategoryResponses,
  selectedIds,
  onCheckedChange = () => null,
  dismissWelcomeAndUpdateSearchParams,
  setNoAgencyCategoryResponseTypesSelected,
}: CommunityBoardBudgetRequestAgencyCategoryResponseProps) {
  return (
    <CbbrCheckboxGroup
      formId="agencyCatergoryResponse"
      formLabel="Agency Response"
      fontWeight="700"
      marginBottom={2}
      fontSize={"xs"}
    >
      <CbbrCheckbox
        key={"all"}
        checkboxValue={"all"}
        checkboxLabel={"Select All"}
        isChecked={selectedIds.length > 0}
        isIndeterminate={
          selectedIds.length > 0 &&
          selectedIds.length !== cbbrAgencyCategoryResponses?.length
        }
        onCheckedChange={() => {
          selectedIds.length !== cbbrAgencyCategoryResponses?.length
            ? setNoAgencyCategoryResponseTypesSelected(false)
            : setNoAgencyCategoryResponseTypesSelected(true);

          dismissWelcomeAndUpdateSearchParams(
            "/community-board-budget-requests",
            {
              cbbrAgencyCategoryResponseIds: null,
            },
          );
        }}
      />
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
