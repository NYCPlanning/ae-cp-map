import { Borough } from "../gen";
import AdminBoundarySelector, {
  AdminBoundarySelector as AdminBoundarySelectorType,
} from "./admin-boundary-selector";

export default function BoroughSelector({
  activeBoundaryId,
  boroughs,
  routePrefix,
}: Pick<AdminBoundarySelectorType, "activeBoundaryId" | "routePrefix"> & {
  boroughs: Array<Borough> | null;
}) {
  return (
    <AdminBoundarySelector
      label="Borough"
      activeBoundaryId={activeBoundaryId}
      routePrefix={routePrefix}
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
