import { Borough } from "~/gen";
import { AdminDropDown, AdminDropDownProps } from ".";
import { BoroId } from "~/components/FilterMenu";

export interface BoroughDropDownProps
  extends Pick<AdminDropDownProps, "selectValue"> {
  updateSearchParams: (value: Record<string, string>) => void;
  boroughs: Array<Borough> | null;
}

export function BoroughDropDown({
  selectValue,
  updateSearchParams,
  boroughs,
}: BoroughDropDownProps) {
  const updateBoroId = (nextBoroId: BoroId) => {
    const nextSearchParams: Record<string, string> =
      nextBoroId !== null
        ? {
            districtType: "cd",
            boroId: nextBoroId,
          }
        : {
            districtType: "cd",
          };

    updateSearchParams(nextSearchParams);
  };

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
      onSelectValueChange={updateBoroId}
    >
      {boroughOptions}
    </AdminDropDown>
  );
}
