import { Button } from "@nycplanning/streetscape";

export { GoToCityCouncilDistrictBtn } from "./GoToCityCouncilDistrictBtn";

export interface GoToDistrictBtnProps {
  goToDistrict: (path: string) => void;
  path: string | null;
}
export function GoToDistrictBtn({ goToDistrict, path }: GoToDistrictBtnProps) {
  return (
    <Button
      width="full"
      onClick={path !== null ? () => goToDistrict(path) : () => undefined}
      isDisabled={path === null}
    >
      Go to Selected District
    </Button>
  );
}
