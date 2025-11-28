import { MVTLayer } from "@deck.gl/geo-layers";
import { useLoaderData, useSearchParams } from "react-router";
import {
  DataFilterExtension,
  DataFilterExtensionProps,
} from "@deck.gl/extensions";
import type { Feature, Geometry } from "geojson";
import {
  BoroughId,
  CommunityBoardBudgetRequestAgencyCategoryResponseId,
  CommunityBoardBudgetRequestNeedGroupId,
  CommunityBoardBudgetRequestPolicyAreaId,
  DistrictId,
  DistrictType,
} from "../../utils/types";
import { loader as mapPageLoader } from "../../layouts/MapPage";

export interface CommunityBoardBudgetRequestProperties {
  id: string;
  agencyInitials: string;
  layerName: string;
  policyAreaId: number;
  cbbrNeedGroupId: number;
  cbbrPolicyAreaId: number;
  cbbrAgencyInitials: string;
  cbbrAgencyCategoryResponseIds: string[];
}

export function useCommunityBoardBudgetRequestsLayer(opts?: {
  visible?: boolean;
}) {
  const visible = opts?.visible ?? true;
  const [searchParams] = useSearchParams();
  const districtType = searchParams.get("districtType") as DistrictType;
  const boroughId = searchParams.get("boroughId") as BoroughId;
  const districtId = searchParams.get("districtId") as DistrictId;
  const cbbrNeedGroupId = searchParams.get(
    "cbbrNeedGroupIds",
  ) as CommunityBoardBudgetRequestNeedGroupId;
  const cbbrPolicyAreaId = searchParams.get(
    "cbbrPolicyAreaId",
  ) as CommunityBoardBudgetRequestPolicyAreaId;
  const cbbrAgencyInitials = searchParams.get("cbbrAgencyInitials");
  const cbbrAgencyCategoryResponseIdsParam = searchParams.get(
    "cbbrAgencyCategoryResponseId",
  ) as CommunityBoardBudgetRequestAgencyCategoryResponseId;
  const cbbrAgencyCategoryResponseIds =
    cbbrAgencyCategoryResponseIdsParam === null
      ? []
      : cbbrAgencyCategoryResponseIdsParam.split(",");

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

  const policyAreaIconsMap: Record<number, string> = {
    1: "health",
    2: "education",
    3: "safety",
    4: "infrastructure",
    5: "housing",
    6: "transportation",
    7: "parks",
    8: "other",
  };
  const loaderData = useLoaderData<typeof mapPageLoader>();

  const fullAgencyList = loaderData.cbbrAgencies
    ? loaderData.cbbrAgencies.map((agency) => agency.initials)
    : [];

  const fullNeedGroupList = loaderData.cbbrNeedGroups
    ? loaderData.cbbrNeedGroups.map((ng) => ng.id)
    : [];

  const fullPolicyAreaList = loaderData.cbbrPolicyAreas
    ? loaderData.cbbrPolicyAreas.map((ng) => ng.id)
    : [];

  // const fullAgencyList = [
  //   "ACS",
  //   "BPL",
  //   "DFTA",
  //   "DOB",
  //   "DCP",
  //   "DCAS",
  //   "DCWP",
  //   "DCLA",
  //   "DOE",
  //   "DEP",
  //   "DOHMH",
  //   "DHS",
  //   "DPR",
  //   "DSNY",
  //   "SBS",
  //   "DOT",
  //   "DYCD",
  //   "EDC",
  //   "FDNY",
  //   "HHC",
  //   "NYCHA",
  //   "HPD",
  //   "HRA",
  //   "LPC",
  //   "CECM",
  //   "MOME",
  //   "NYPL",
  //   "MOCJ",
  //   "OEM",
  //   "OMB",
  //   "OTI",
  //   "OTH",
  //   "NYPD",
  //   "QPL",
  //   "SCA",
  //   "TLC",
  //   "NYCTA",
  // ];

  console.debug(
    "fullAgencyList",
    fullAgencyList,
    "fullNeedGroupList",
    fullNeedGroupList,
    "fullPolicyAreaList",
    fullPolicyAreaList,
  );
  // cbbrAgencyInitials === null ? fullAgencyList : [cbbrAgencyInitials];
  console.debug("cbbrAgencyInitials", cbbrAgencyInitials);
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
    visible,
    pickable: true,
    getFillColor: [43, 108, 176, 166],
    pointType: "icon",
    getIcon: (d: { properties: CommunityBoardBudgetRequestProperties }) => {
      const icon = policyAreaIconsMap[d.properties.policyAreaId];
      return {
        url: `/policy-area-icons/${icon}.svg`,
        width: 40,
        height: 40,
      };
    },
    iconSizeScale: 1,
    iconSizeMinPixels: 24,
    iconSizeMaxPixels: 24,
    getFilterCategory: (d) => {
      // console.debug("d.properties.agencyInitials;", d.properties.agencyInitials);
      return d.properties.agencyInitials;
    },
    filterCategories: [
      cbbrAgencyInitials !== null ? [cbbrAgencyInitials] : fullAgencyList,
      cbbrNeedGroupId !== null ? [cbbrNeedGroupId] : fullNeedGroupList,
      cbbrPolicyAreaId !== null ? [cbbrPolicyAreaId] : fullPolicyAreaList,
    ],
    extensions: [
      new DataFilterExtension({
        // filterSize: 1,
        categorySize: 1,
      }),
    ],
    updateTriggers: {
      getFilterCategory: [cbbrAgencyInitials],
    },
  });
}
