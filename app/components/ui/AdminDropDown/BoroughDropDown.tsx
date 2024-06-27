import { Borough } from "~/gen";
import { AdminDropDown, AdminDropDownProps } from ".";

export interface BoroughDropDownProps
  extends Pick<AdminDropDownProps, "onSelectValueChange" | "selectValue"> {
  boroughs: Array<Borough> | null;
}

export function BoroughDropDown({
  selectValue,
  onSelectValueChange,
  boroughs,
}: BoroughDropDownProps) {
  const boroughOptions = boroughs?.map((borough) => (
    <option key={borough.id} value={borough.id}>
      {borough.title}
    </option>
  ));
  return (
    <AdminDropDown
      formId="boroId"
      formLabel="Borough"
      isSelectDisabled={boroughs === null}
      selectValue={selectValue}
      onSelectValueChange={onSelectValueChange}
    >
      {boroughOptions}
    </AdminDropDown>
  );
}
