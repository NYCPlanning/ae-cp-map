import { MVTLayer } from "@deck.gl/geo-layers";
import { useState } from "react";

export interface CapitalProjectsLayerProperties {
  managingCodeCapitalProjectId: "850BED-780";
  managingAgency: "DDC";
}

export function useCapitalProjectsLayer() {
  const [hoveredCapitalProjectId, setHoveredCapitalProjectId] = useState<
    string | null
  >(null);
  return new MVTLayer({
    id: "capitalProjects",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/capital-projects/{z}/{x}/{y}.pbf`,
    ],
    pickable: true,
    getFillColor: (f) => {
      const { managingCodeCapitalProjectId } = f.properties;
      return managingCodeCapitalProjectId === hoveredCapitalProjectId
        ? [129, 230, 217, 166]
        : [217, 107, 39, 166];
    },
    getPointColor: (f: any) => {
      const { managingCodeCapitalProjectId } = f.properties;
      return managingCodeCapitalProjectId === hoveredCapitalProjectId
        ? [129, 230, 217, 218]
        : [217, 107, 39, 218];
    },
    getPointRadius: 5,
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    onHover: (data) => {
      const managingCodeCapitalProjectId =
        data.object?.properties?.managingCodeCapitalProjectId;
      const nextHoveredCapitalProject =
        typeof managingCodeCapitalProjectId === "string"
          ? managingCodeCapitalProjectId
          : null;
      setHoveredCapitalProjectId(nextHoveredCapitalProject);
    },
    updateTriggers: {
      getFillColor: [hoveredCapitalProjectId],
      getPointColor: [hoveredCapitalProjectId],
    },
  });
}
