import { useSearchParams } from "react-router";
import { MVTLayer } from "@deck.gl/geo-layers";
import { env } from "~/utils/env";

const { zoningApiUrl } = env;

export interface BoroughProperties {
  layerName: string;
  id: string;
}

export function useBoroughsOutlinesLayer() {
  const [searchParams] = useSearchParams();
  const boundaryType = searchParams.get("boundaryType");

  return new MVTLayer<BoroughProperties>({
    id: "BoroughsOutlines",
    data: [`${zoningApiUrl}/api/boroughs/{z}/{x}/{y}.pbf`],
    visible: boundaryType === "borough",
    uniqueIdProperty: "boroughId",
    pickable: false,
    getLineColor: [113, 128, 150, 255],
    getLineWidth: 1,
    lineWidthUnits: "pixels",
    pointType: "text",
    getFillColor: [0, 0, 0, 0],
    autoHighlight: true,
    highlightColor: [0, 0, 0, 0],
  });
}
