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
import { EducationIcon, HealthIcon, HousingIcon, InfrastructureIcon, ParksIcon, PeopleIcon, SafetyIcon, TransportationIcon } from "app/icons";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ReactDOMServer, { renderToStaticMarkup, ReactDOMServerReadableStream } from 'react-dom/server';

// import {education.svg} from "../../../public/policy-area-icons";

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


  function svgToDataURL(svg: string) {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}


  const icons = [<EducationIcon />, <HealthIcon />, <HousingIcon />, <InfrastructureIcon />, 
    <ParksIcon />, <PeopleIcon />, <SafetyIcon />, <TransportationIcon />];
  
    for (let i: number = 0; i < icons.length; i++) {
        console.log(icons[i]);
        const iconString = ReactDOMServer.renderToString(icons[i]);
        const iconDataUri = `url("data:image/svg+xml;base64,${btoa(iconString)}")`;
        console.log(iconDataUri);
    }
  const layer = new IconLayer({
  id: 'IconLayer',
  visible: false,
  data: [
      `${import.meta.env.VITE_ZONING_API_URL}/api/${endpointPrefix}community-board-budget-requests/{z}/{x}/{y}.pbf`,
    ],
  getColor: (d: { exits: number; }) => [Math.sqrt(d.exits), 140, 0],
  pointType: 'icon',
  // getPointRadius: 150,

    getFillColor: (d: { properties: { layerName: string; }; }) => {
      if (d.properties.layerName === "community-board-budget-request-label")
        console.log("POINT data", d);
      return [430, 108, 176, 166];
    },
    getIcon: (d: any) => {
    return {
      url: svgToDataURL("../../public/policy-area-icons/education.svg"),
      height: 2400,
      width: 2400,
    }
  },
  pickable: true
});

const edusvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" focusable="false" class="chakra-icon css-nyt2fo"><rect width="16" height="16" rx="8" fill="#2B6CB0" fill-opacity="0.1"></rect><path d="M4.22971 6.585L7.69331 4.8534C7.7266 4.83678 7.7633 4.82812 7.80051 4.82812C7.83772 4.82812 7.87442 4.83678 7.90771 4.8534L11.3713 6.5854C11.4111 6.60534 11.4446 6.63598 11.468 6.67388C11.4915 6.71178 11.5039 6.75545 11.5039 6.8C11.5039 6.84454 11.4915 6.88821 11.468 6.92611C11.4446 6.96401 11.4111 6.99465 11.3713 7.0146L7.90771 8.7462C7.87442 8.76282 7.83772 8.77147 7.80051 8.77147C7.7633 8.77147 7.7266 8.76282 7.69331 8.7462L4.22971 7.0142C4.18988 6.99425 4.15638 6.96361 4.13298 6.92571C4.10957 6.88781 4.09717 6.84414 4.09717 6.7996C4.09717 6.75505 4.10957 6.71138 4.13298 6.67348C4.15638 6.63558 4.18988 6.60494 4.22971 6.585Z" stroke="#2B6CB0" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.2005 8.39961V6.99961L11.4005 6.59961M5.00049 7.39961V9.56441C5.00046 9.71576 5.04336 9.86401 5.12422 9.99196C5.20508 10.1199 5.32057 10.2223 5.45729 10.2872L7.45729 11.2368C7.56453 11.2877 7.68177 11.3142 7.80049 11.3142C7.91921 11.3142 8.03645 11.2877 8.14369 11.2368L10.1437 10.2872C10.2804 10.2223 10.3959 10.1199 10.4768 9.99196C10.5576 9.86401 10.6005 9.71576 10.6005 9.56441V7.39961" stroke="#2B6CB0" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

// `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" focusable="false" class="chakra-icon css-nyt2fo">
// <rect rx="8" fill="#2B6CB0" fill-opacity="0.1"/>
// <path d="M4.22971 6.585L7.69331 4.8534C7.7266 4.83678 7.7633 4.82812 7.80051 4.82812C7.83772 4.82812 7.87442 4.83678 7.90771 4.8534L11.3713 6.5854C11.4111 6.60534 11.4446 6.63598 11.468 6.67388C11.4915 6.71178 11.5039 6.75545 11.5039 6.8C11.5039 6.84454 11.4915 6.88821 11.468 6.92611C11.4446 6.96401 11.4111 6.99465 11.3713 7.0146L7.90771 8.7462C7.87442 8.76282 7.83772 8.77147 7.80051 8.77147C7.7633 8.77147 7.7266 8.76282 7.69331 8.7462L4.22971 7.0142C4.18988 6.99425 4.15638 6.96361 4.13298 6.92571C4.10957 6.88781 4.09717 6.84414 4.09717 6.7996C4.09717 6.75505 4.10957 6.71138 4.13298 6.67348C4.15638 6.63558 4.18988 6.60494 4.22971 6.585Z" stroke="#2B6CB0" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
// <path d="M12.2005 8.39961V6.99961L11.4005 6.59961M5.00049 7.39961V9.56441C5.00046 9.71576 5.04336 9.86401 5.12422 9.99196C5.20508 10.1199 5.32057 10.2223 5.45729 10.2872L7.45729 11.2368C7.56453 11.2877 7.68177 11.3142 7.80049 11.3142C7.91921 11.3142 8.03645 11.2877 8.14369 11.2368L10.1437 10.2872C10.2804 10.2223 10.3959 10.1199 10.4768 9.99196C10.5576 9.86401 10.6005 9.71576 10.6005 9.56441V7.39961" stroke="#2B6CB0" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>`;

function createSVGIcon() {
  
  // return `
  //   <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //     <circle cx="12" cy="12" r="10" fill="rgb(${20}, 0, 0)" stroke="#fa1" stroke-width="2"/>
  //   </svg>
  // `;
  return edusvg;
}
  console.log("lsdkajflskdj;fa", svgToDataURL(createSVGIcon()));
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
    getIconColor: [43, 108, 176, 166],
   getIcon: (d: any) => {
    return {
      url: svgToDataURL(createSVGIcon()),
      width: 16,
    height: 16
  }},
  iconSizeScale: 1.5,
  getIconSize: 16,
  iconSizeMinPixels: 16,
  iconSizeMaxPixels: 50,
  });

  return [mvt, layer]
}