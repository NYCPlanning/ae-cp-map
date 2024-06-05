import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { useNavigate } from "@remix-run/react";
import { ReactNode } from "react";

export interface AdminBoundarySelector {
  children: ReactNode;
  activeBoundaryId: string;
  boundaries: Array<{ id: string | number }>;
  routePrefix: string;
}
export default function AdminBoundarySelector({
  children,
  activeBoundaryId,
  boundaries,
  routePrefix,
}: AdminBoundarySelector) {
  const navigate = useNavigate();

  const navigateToBoundary = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`${routePrefix}/${e.target.value}`);
  };

  return (
    <FormControl>
      <FormLabel>{children}</FormLabel>
      <Select
        variant="base"
        value={activeBoundaryId}
        onChange={navigateToBoundary}
      >
        <option value={""}>-Select-</option>
        {boundaries.map((district) => (
          <option key={district.id}>{district.id}</option>
        ))}
      </Select>
    </FormControl>
  );
}
