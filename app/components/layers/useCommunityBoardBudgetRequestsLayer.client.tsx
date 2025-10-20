import { MVTLayer } from "@deck.gl/geo-layers";
// import {
// useLoaderData,
// useNavigate,
import {
  useSearchParams,
} from "react-router";
// useParams,
// useSearchParams,
// useMatches,
// } from "react-router";
import {
  // DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
// import { FindAgenciesQueryResponse } from "../../gen";
import {
  BoroughId,
  DistrictId,
  DistrictType,
} from "../../utils/types";

export interface CommunityBoardBudgetRequestProperties {
  id: string;
  agencyInitials: string;
  layerName:
    | "community-board-budget-request-fill"
    | "community-board-budget-request-label";
}

// const communityBoardBudgetRequestsInCityCouncilDistrictRoutePrefix =
//   "routes/city-council-districts.$cityCouncilDistrictId.community-board-budget-requests";

export function useCommunityBoardBudgetRequestsLayer() {
  // const { cbbrId } = useParams();
  const [searchParams] = useSearchParams();
  // const agencyInitials = searchParams.get("cbbrAgencyInitials");
  // const navigate = useNavigate();

  // const matches = useMatches();

  // const layoutRoute = matches[1];

  // const onCommunityBoardBudgetRequestsInCityCouncilDistrictPath =
  //   layoutRoute?.id.startsWith(
  //     communityBoardBudgetRequestsInCityCouncilDistrictRoutePrefix,
  //   );
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

  // let endpointPrefix = "";
  // if (onCommunityBoardBudgetRequestsInCityCouncilDistrictPath) {
  //   endpointPrefix = `city-council-districts/${layoutRoute.params.cityCouncilDistrictId}/`;
  // }

  // const loaderData = useLoaderData<
  //   FindAgenciesQueryResponse | { agencies: null }
  // >();

  // const fullAgencyAcronymList = loaderData.agencies
  //   ? loaderData.agencies.map((agency) => agency.initials)
  //   : [];
  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
  };

  return new MVTLayer<
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
    // autoHighlight: true,
    // highlightColor: [129, 230, 217, 218],
    pickable: true,
    // filterCategories: [
    //   agencyInitials === null ? fullAgencyAcronymList : [agencyInitials],
    //   [1],
    // ],
    // getFillColor: [43, 108, 176, 166],
    pointType: 'icon',
    iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    getIcon: (data: any) => "marker",
    iconSizeScale: 12,
    getFillColor: (data) => {
      if (data.properties.layerName === "community-board-budget-request-label")
        console.log("data", data);
      // console.log("properties", data.properties);
      // const { id } = data.properties;
      // switch (id) {
      //   case cbbrId:
      //     return [56, 178, 172, 166];
      //   default:
      return [43, 108, 176, 166];
      // }
    },
    getPointRadius: 150,
    getLineColor: [255, 255, 255, 255],
    getLineWidth: 1,
    // onClick: (data) => {
    //   const nextId = data.object?.properties?.id;

    //   if (nextId === undefined) return;
    //   // Avoid adding the same capital project to the history stack
    //   if (nextId === cbbrId) return;
    //   const communityBoardBudgetRequestRouteSuffix = `community-board-budget-requests/${nextId}`;
    //   navigate({
    //     pathname: `${endpointPrefix}${communityBoardBudgetRequestRouteSuffix}`,
    //     search: `?${searchParams.toString()}`,
    //   });
    // },
    // updateTriggers: {
    //   getFillColor: [cbbrId],
    //   getPointColor: [cbbrId],
    //   getFilterCategory: [agencyInitials],
    // },
    // extensions: [
    //   new DataFilterExtension({
    //     filterSize: 1,
    //     categorySize: 2,
    //   }),
    // ],
  });
}