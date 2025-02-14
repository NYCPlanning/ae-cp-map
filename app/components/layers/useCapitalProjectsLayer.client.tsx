import { MVTLayer } from "@deck.gl/geo-layers";
import {
  useMatches,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";

export interface CapitalProjectProperties {
  managingCodeCapitalProjectId: string;
  managingAgency: string;
}

export function useCapitalProjectsLayer() {
  const { managingCode, capitalProjectId } = useParams();
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType");
  const boroughId = searchParams.get("boroughId");
  const districtId = searchParams.get("districtId");
  const navigate = useNavigate();
  const matches = useMatches();

  const layoutRoute = matches[1];

  let endpointPrefix = "";
  if (districtType === "ccd" && districtId) {
    endpointPrefix = `city-council-districts/${districtId}/`;
  } else if (districtType === "cd" && boroughId && districtId) {
    endpointPrefix = `boroughs/${boroughId}/community-districts/${districtId}/`;
  }

  const managingAgency = searchParams.get("managingAgency") || "";

  return new MVTLayer<
    CapitalProjectProperties,
    DataFilterExtensionProps<Feature<Geometry, CapitalProjectProperties>>
  >({
    id: "capitalProjects",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/${endpointPrefix}capital-projects/{z}/{x}/{y}.pbf`,
    ],
    uniqueIdProperty: "managingCodeCapitalProjectId",
    autoHighlight: true,
    highlightColor: [129, 230, 217, 218],
    pickable: true,
    getFilterCategory: (f: Feature<Geometry, CapitalProjectProperties>) =>
      f.properties.managingAgency,
    filterCategories: [managingAgency],
    getFillColor: ({ properties }) => {
      const { managingCodeCapitalProjectId } = properties;
      switch (managingCodeCapitalProjectId) {
        case `${managingCode}${capitalProjectId}`:
          return [56, 178, 172, 166];
        default:
          return [217, 107, 39, 166];
      }
    },
    getPointRadius: 5,
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    onClick: (data) => {
      const managingCodeCapitalProjectId =
        data.object?.properties?.managingCodeCapitalProjectId;

      if (managingCodeCapitalProjectId === undefined) return;
      // Avoid adding the same capital project to the history stack
      if (managingCodeCapitalProjectId === `${managingCode}${capitalProjectId}`)
        return;
      const [nextManagingCode, nextCapitalProjectId] = [
        managingCodeCapitalProjectId.slice(0, 3),
        managingCodeCapitalProjectId.slice(3),
      ];

      const capitalProjectRouteSuffix = `capital-projects/${nextManagingCode}/${nextCapitalProjectId}`;
      navigate({
        pathname: `${endpointPrefix}${capitalProjectRouteSuffix}`,
        search: `?${searchParams.toString()}`,
      });
    },
    updateTriggers: {
      getFillColor: [managingCode, capitalProjectId],
      getPointColor: [managingCode, capitalProjectId],
    },
    extensions: [new DataFilterExtension({ categorySize: 1 })],
  });
}
