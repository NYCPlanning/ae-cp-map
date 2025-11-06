import { Borough } from "~/gen";
import { DropdownControlProps, DropdownControl } from ".";
import { AdminQueryParams, BoroughId } from "~/utils/types";

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
  const updateBoroughId = (nextBoroughId: BoroughId) => {
    setAdminParams({
      districtType: "cd",
      boroughId: nextBoroughId,
      districtId: null,
    });
  };

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
      onSelectValueChange={updateBoroughId}
      fontWeight="700"
    >
      {boroughOptions}
    </DropdownControl>
  );
}
