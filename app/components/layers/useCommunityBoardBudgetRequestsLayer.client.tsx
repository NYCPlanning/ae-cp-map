import { MVTLayer } from "@deck.gl/geo-layers";
import {
  useSearchParams,
} from "react-router";
import {
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import {
  BoroughId,
  DistrictId,
  DistrictType,
} from "../../utils/types";
import { IconLayer } from "@deck.gl/layers";
import { EducationIcon } from "app/icons";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { renderToStaticMarkup } from 'react-dom/server';
import { url } from "inspector";

export interface CommunityBoardBudgetRequestProperties {
  id: string;
  agencyInitials: string;
  layerName:
    | "community-board-budget-request-fill"
    | "community-board-budget-request-label";
}

export function useCommunityBoardBudgetRequestsLayer() {
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const onCapitalProjectsInCityCouncilDistrictPath =
    districtType === "ccd" && districtId !== null;
  const onCapitalProjectsInCommunityDistrictPath =
    districtType === "cd" && boroughId !== null && districtId !== null;

  let endpointPrefix = "";
  if (onCapitalProjectsInCityCouncilDistrictPath) {
    endpointPrefix = `city-council-districts/${districtId}/`;
  } else if (onCapitalProjectsInCommunityDistrictPath) {
    endpointPrefix = `boroughs/${boroughId}/community-districts/${districtId}/`;
  }

  const education = <EducationIcon/>;
  console.log(education);

  const educationString = encodeURIComponent(renderToStaticMarkup(<EducationIcon />));
  console.log("education string ", educationString);
  const dataUri = `url("data:image/svg+xml,${educationString}")`;
  console.log("datauri ", dataUri);
  const layer = new IconLayer({
  id: 'IconLayer',
  visible: true,
  data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/${endpointPrefix}community-board-budget-requests/{z}/{x}/{y}.pbf`,
    ],
  getColor: (d: { exits: number; }) => [Math.sqrt(d.exits), 140, 0],
  pointType: 'circle',
  getPointRadius: 150,

    getFillColor: (d: { properties: { layerName: string; }; }) => {
      if (d.properties.layerName === "community-board-budget-request-label")
        console.log("POINT data", d);
      return [430, 108, 176, 166];
    },
  // getIcon: (d) => {
  //   return {
  //     url: dataUri,
  //     height: 240,
  //     width: 240,
  //   }
  // },
  pickable: true
});

const mvt = new MVTLayer<
    CommunityBoardBudgetRequestProperties,
    DataFilterExtensionProps<
      Feature<Geometry, CommunityBoardBudgetRequestProperties>
    >
  >({
    id: "communityBoardBudgetRequests",
    data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/${endpointPrefix}community-board-budget-requests/{z}/{x}/{y}.pbf`,
    ],
    uniqueIdProperty: "id",
    visible: true,
    pickable: true,
    getFillColor: (data) => {
      if (data.properties.layerName === "community-board-budget-request-label")
        console.log("data", data);
      return [43, 108, 176, 166];
    },
    pointType: 'icon',
    getPointRadius: 50,
    // getIconColor: [0, 0, 0, 255],
    iconSizeUnits: 'pixels',
    iconSizeScale: 5,
    getIcon: (d: { properties: { id: any; }; }) => {
    return {
      url: dataUri,
      height: 24,
      width: 24,
      // id: d.properties.
    }
  },
    getIconSize: 15,
    // getLineColor: [255, 255, 255, 255],
    // getLineWidth: 1,
  });

  return [mvt, layer]
}