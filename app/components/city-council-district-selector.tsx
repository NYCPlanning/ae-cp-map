import { CityCouncilDistrict } from "../gen";
import AdminBoundarySelector, {
  AdminBoundarySelector as AdminBoundarySelectorType,
} from "./admin-boundary-selector";

export default function CityCouncilDistrictSelector({
  cityCouncilDistricts,
  ...props
}: Pick<AdminBoundarySelectorType, "activeBoundaryId" | "routePrefix"> & {
  cityCouncilDistricts: Array<CityCouncilDistrict>;
}) {
  return (
    <AdminBoundarySelector label="District" {...props}>
      {cityCouncilDistricts
        ? cityCouncilDistricts.map((district) => (
            <option key={district.id}>{district.id}</option>
          ))
        : null}
    </AdminBoundarySelector>
  );
}
