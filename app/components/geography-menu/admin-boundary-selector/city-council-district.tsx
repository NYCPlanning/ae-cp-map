import { CityCouncilDistrict } from "../../../gen";
import AdminBoundarySelector, {
  AdminBoundarySelector as AdminBoundarySelectorType,
} from "./base";

export default function CityCouncilDistrictSelector({
  cityCouncilDistricts,
  activeBoundaryId,
}: Pick<AdminBoundarySelectorType, "activeBoundaryId"> & {
  cityCouncilDistricts: Array<CityCouncilDistrict> | null;
}) {
  return (
    <AdminBoundarySelector
      label="District"
      activeBoundaryId={activeBoundaryId}
      routePrefix="city-council-districts"
    >
      {cityCouncilDistricts
        ? cityCouncilDistricts.map((district) => (
            <option key={district.id}>{district.id}</option>
          ))
        : null}
    </AdminBoundarySelector>
  );
}
