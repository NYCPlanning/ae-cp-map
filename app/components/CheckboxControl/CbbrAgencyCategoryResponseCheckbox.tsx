import { CbbrCheckboxGroup } from "./CbbrCheckboxGroup";
import {
  CommunityBoardBudgetRequestAgencyCategoryResponseId,
  QueryParams,
} from "../../utils/types";
import { CbbrCheckbox } from ".";
import { useStore } from "~/store";

export interface CommunityBoardBudgetRequestAgencyCategoryResponseProps {
  onCheckedChange: (
    value: CommunityBoardBudgetRequestAgencyCategoryResponseId,
  ) => void;
  dismissWelcomeAndUpdateSearchParams: (
    newPath: string,
    changes: QueryParams,
  ) => void;
}

export function CbbrAgencyCategoryResponseCheckbox({
  onCheckedChange = () => null,
  dismissWelcomeAndUpdateSearchParams,
}: CommunityBoardBudgetRequestAgencyCategoryResponseProps) {
  const cbbrAgencyCategoryResponseCheckboxes = useStore(
    (state) => state.cbbrAgencyCategoryResponseCheckboxes,
  );
  const selectedCount = cbbrAgencyCategoryResponseCheckboxes.filter(
    (c) => c.checked === true,
  ).length;
  const updateAllCbbrAgencyCategoryResponseCheckboxesByValue = useStore(
    (state) => state.updateAllCbbrAgencyCategoryResponseCheckboxesByValue,
  );

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
        isChecked={selectedCount > 0}
        isIndeterminate={
          selectedCount > 0 &&
          selectedCount !== cbbrAgencyCategoryResponseCheckboxes.length
        }
        onCheckedChange={() => {
          if (selectedCount !== cbbrAgencyCategoryResponseCheckboxes.length) {
            updateAllCbbrAgencyCategoryResponseCheckboxesByValue(true);
          } else {
            updateAllCbbrAgencyCategoryResponseCheckboxesByValue(false);
          }
          dismissWelcomeAndUpdateSearchParams(
            "/community-board-budget-requests",
            {
              cbbrAgencyCategoryResponseIds: null,
            },
          );
        }}
      />
      {cbbrAgencyCategoryResponseCheckboxes.map((cbbrACR) => {
        return (
          <CbbrCheckbox
            key={cbbrACR.id}
            checkboxValue={cbbrACR.id}
            checkboxLabel={cbbrACR.description}
            isChecked={cbbrACR.checked}
            onCheckedChange={(value) => {
              onCheckedChange(String(value));
            }}
          />
        );
      })}
    </CbbrCheckboxGroup>
  );
}
