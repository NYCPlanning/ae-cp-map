import { FormControl, FormLabel, Select } from "@nycplanning/streetscape";
import { useNavigate } from "@remix-run/react";
import { ReactNode } from "react";

export interface AdminBoundarySelector {
  children: ReactNode | null;
  label: string;
  activeBoundaryId: string | null;
  routePrefix: string;
}

export default function AdminBoundarySelector({
  children,
  label,
  activeBoundaryId,
  routePrefix,
}: AdminBoundarySelector) {
  const navigate = useNavigate();

  const navigateToBoundary = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/${routePrefix}/${e.target.value}`);
  };

  return (
    <FormControl isDisabled={children === null}>
      <FormLabel>{label}</FormLabel>
      <Select
        variant="base"
        value={activeBoundaryId ?? ""}
        onChange={navigateToBoundary}
      >
        <option value={""}>-Select-</option>
        {children}
      </Select>
    </FormControl>
  );
}
