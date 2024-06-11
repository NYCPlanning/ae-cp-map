import { Borough } from "../../../gen";
import AdminBoundarySelector, {
  AdminBoundarySelector as AdminBoundarySelectorType,
} from "./base";

export default function BoroughSelector({
  activeBoundaryId,
  boroughs,
}: Pick<AdminBoundarySelectorType, "activeBoundaryId"> & {
  boroughs: Array<Borough> | null;
}) {
  return (
    <AdminBoundarySelector
      label="Borough"
      activeBoundaryId={activeBoundaryId}
      routePrefix="community-districts"
    >
      {boroughs
        ? boroughs.map((borough) => (
            <option key={borough.id} value={borough.id}>
              {borough.title}
            </option>
          ))
        : null}
    </AdminBoundarySelector>
  );
}
