import { GoToDistrictBtn, GoToDistrictBtnProps } from ".";

export interface GoToCityCouncilDistrictBtnProps
  extends Pick<GoToDistrictBtnProps, "goToDistrict"> {
  districtId: string | null;
}

export function GoToCityCouncilDistrictBtn({
  districtId,
  ...props
}: GoToCityCouncilDistrictBtnProps) {
  return (
    <GoToDistrictBtn
      path={
        districtId === null
          ? null
          : `city-council-districts/${districtId}/capital-projects`
      }
      {...props}
    />
  );
}
