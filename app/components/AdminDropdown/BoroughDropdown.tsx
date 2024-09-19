import { Borough } from "~/gen";
import { AdminDropdownProps, AdminDropdown } from ".";
import { BoroughId } from "~/root";

export interface BoroughDropdownProps
  extends Pick<AdminDropdownProps, "selectValue"> {
  updateSearchParams: (value: Record<string, string | undefined>) => void;
  boroughs: Array<Borough> | null;
}

export function BoroughDropdown({
  selectValue,
  updateSearchParams,
  boroughs,
}: BoroughDropdownProps) {
  const updateBoroughId = (nextBoroughId: BoroughId) => {
    const nextSearchParams: Record<string, string | undefined> =
      nextBoroughId !== null
        ? {
            districtType: "cd",
            boroughId: nextBoroughId,
            districtId: undefined,
          }
        : {
            districtType: "cd",
            boroughId: undefined,
            districtId: undefined,
          };

    updateSearchParams(nextSearchParams);
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
