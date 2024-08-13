import { GoToDistrictBtn, GoToDistrictBtnProps } from ".";

export interface GoToCommunityDistrictBtnProps
  extends Pick<GoToDistrictBtnProps, "goToDistrict"> {
  boroughId: string | null;
  districtId: string | null;
}

export function GoToCommunityDistrictBtn({
  boroughId,
  districtId,
  ...props
}: GoToCommunityDistrictBtnProps) {
  return (
    <GoToDistrictBtn
      path={
        boroughId === null || districtId === null
          ? null
          : `boroughs/${boroughId}/community-districts/${districtId}/capital-projects`
      }
      {...props}
    />
  );
}
