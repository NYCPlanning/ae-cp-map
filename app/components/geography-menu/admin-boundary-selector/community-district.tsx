import AdminBoundarySelector, {
  AdminBoundarySelector as AdminBoundarySelectorType,
} from "./base";
import { CommunityDistrict } from "../../../gen";

export default function CommunityDistrictSelector({
  activeBoundaryId,
  communityDistricts,
  activeBoroughId,
}: Pick<AdminBoundarySelectorType, "activeBoundaryId"> & {
  communityDistricts: Array<CommunityDistrict> | null;
  activeBoroughId: string | null;
}) {
  return (
    <AdminBoundarySelector
      label="District"
      activeBoundaryId={activeBoundaryId}
      routePrefix={
        activeBoroughId === null ? "" : `community-districts/${activeBoroughId}`
      }
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
