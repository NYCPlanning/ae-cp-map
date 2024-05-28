import { MVTLayer } from "@deck.gl/geo-layers";

export function useCapitalProjectsLayer() {
  return new MVTLayer({
    id: "capital-projects",
    data: `${import.meta.env.VITE_ZONING_API_URL}/api/capital-projects/{z}/{x}/{y}.pbf`,
    // data: `${import.meta.env.VITE_TILE_BUCKET}/tax_lot/{z}/{x}/{y}.pbf`,
    getFillColor: (f) => {
      console.debug("feature", f);
      return [120, 150, 180];
    },
    getPointRadius: () => 3,
  });
}
