import AdminBoundarySelector, {
  AdminBoundarySelector as AdminBoundarySelectorType,
} from "./admin-boundary-selector";
import { CommunityDistrict } from "~/gen";

export default function CommunityDistrictSelector({
  activeBoundaryId,
  communityDistricts,
  routePrefix,
}: Pick<AdminBoundarySelectorType, "activeBoundaryId" | "routePrefix"> & {
  communityDistricts: Array<CommunityDistrict> | null;
}) {
  return (
    <AdminBoundarySelector
      label="Community District"
      activeBoundaryId={activeBoundaryId}
      routePrefix={routePrefix}
    >
      {communityDistricts
        ? communityDistricts.map((communityDistrict) => (
            <option key={communityDistrict.id} value={communityDistrict.id}>
              {communityDistrict.id}
            </option>
          ))
        : null}
    </AdminBoundarySelector>
  );
}
