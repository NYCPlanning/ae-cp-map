import { MVTLayer } from "@deck.gl/geo-layers";

export function useCapitalProjectsLayer() {
  return new MVTLayer({
    id: "capitalProjects",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/capital-projects/{z}/{x}/{y}.pbf`,
    ],
    uniqueIdProperty: "managingCodeCapitalProjectId",
    pickable: true,
    getFillColor: [217, 107, 39, 166],
    getPointColor: [217, 107, 39, 218],
    autoHighlight: true,
    highlightColor: [129, 230, 217, 218],
    getPointRadius: 5,
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
  });
}
