import { Borough } from "~/gen";
import { DropdownControlProps, DropdownControl } from ".";
import { AdminQueryParams, BoroughId } from "~/utils/types";
import { SEARCH_PARAMS } from "~/utils/params";

export interface BoroughDropdownProps
  extends Pick<DropdownControlProps, "selectValue"> {
  boroughs: Array<Borough> | null;
  setAdminParams: (value: AdminQueryParams) => void;
}

export function BoroughDropdown({
  selectValue,
  boroughs,
  setAdminParams,
}: BoroughDropdownProps) {
  const boroughOptions = boroughs?.map((borough) => (
    <option key={borough.id} value={borough.id}>
      {borough.title}
    </option>
  ));

  return (
    <DropdownControl
      formId="boroughId"
      formLabel="Borough"
      isSelectDisabled={boroughs === null}
      selectValue={selectValue}
      onSelectValueChange={(nextBoroughId) => {
        if (typeof nextBoroughId !== "string")
          throw new Error("Unexpected type for borough id. Expected string");
        setAdminParams({
          [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_TYPE.KEY]: "cd",
          [SEARCH_PARAMS.GEOGRAPHY.BOROUGH_ID.KEY]: nextBoroughId,
          [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_ID.KEY]: null,
        });
      }}
      fontWeight="700"
    >
      {boroughOptions}
    </DropdownControl>
  );
}
