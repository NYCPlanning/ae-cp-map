import { Borough } from "~/gen";
import { AdminDropdownProps, AdminDropdown } from ".";
import { AdminParams, BoroughId } from "~/utils/types";

export interface BoroughDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  boroughs: Array<Borough> | null;
  setAdminParams: (value: AdminParams) => void;
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
    <AdminDropdown
      formId="boroughId"
      formLabel="Borough"
      isSelectDisabled={boroughs === null}
      selectValue={selectValue}
      onSelectValueChange={updateBoroughId}
    >
      {boroughOptions}
    </AdminDropdown>
  );
}
