import { MVTLayer } from "@deck.gl/geo-layers";
// import {
// useLoaderData,
// useNavigate,
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
  // const [searchParams] = useSearchParams();
  // const agencyInitials = searchParams.get("cbbrAgencyInitials");
  // const navigate = useNavigate();

  // const matches = useMatches();

  // const layoutRoute = matches[1];

  // const onCommunityBoardBudgetRequestsInCityCouncilDistrictPath =
  //   layoutRoute?.id.startsWith(
  //     communityBoardBudgetRequestsInCityCouncilDistrictRoutePrefix,
  //   );

  const endpointPrefix = "city-council-districts/1/";
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
    getPointRadius: 5,
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
