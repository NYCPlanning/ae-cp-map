import { MVTLayer } from "@deck.gl/geo-layers";

export function useCapitalProjectsLayer() {
  return new MVTLayer<{
    managingCodeCapitalProjectId: string;
    managingAgency: string;
  }>({
    id: "capital-projects",
    data: `${import.meta.env.VITE_ZONING_API_URL}/api/capital-projects/{z}/{x}/{y}.pbf`,
    pickable: true,
    getFillColor: (f) => {
      const agencyColorCode = f.properties.managingCodeCapitalProjectId
        .slice(0, 3)
        .split("")
        .map((initial) => initial.charCodeAt(0) * 3) as [
        number,
        number,
        number,
      ];
      agencyColorCode.push(200);
      return agencyColorCode;
    },
    getPointRadius: () => 5,
  });
}
