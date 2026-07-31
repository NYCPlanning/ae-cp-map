import { StateCreator } from "zustand";
import {
  Borough,
  findCapitalProjects,
  findCommunityBoardBudgetRequests,
  findFacilities,
  FindFacilitiesQueryParamsFacilityJurisdictionsEnumKey,
  FindFacilitiesQueryParamsFacilityOperatorTypesEnumKey,
} from "~/gen";
import { env } from "~/utils/env";
const { zoningApiUrl } = env;

export interface ExportDataModalBaseProps {
  boroughIds: null | string[];
  cityCouncilDistrictIds: null | string[];
  communityDistrictIds: null | string[];
  search: null | string;
  buffer: null | string;
  lats: null | string;
  lons: null | string;
  managingAgency: null | string;
  agencyBudget: null | string;
  commitmentsTotalMin: null | string;
  commitmentsTotalMax: null | string;
  cbbrAgencyCategoryResponseIds: null | string;
  cbbrNeedGroupId: null | string;
  cbbrPolicyAreaId: null | string;
  agencyInitials: null | string;
  facilityTypes: null | string;
  facilityOversightAgency: null | string;
  facilityJurisdictions: null | string;
  facilityCategoryIds: null | string;
  facilityGroupIds: null | string;
  facilitySubgroupIds: null | string;
}

export interface ExportDataModalSelectedDownloadOptionsProps
  extends ExportDataModalBaseProps {
  boroughs?: Borough[];
}

export interface ExportDataModalProps extends ExportDataModalBaseProps {
  dataSetForExport:
    | "capital-projects"
    | "community-board-budget-requests"
    | "facilities";
  totalRecords: {
    "capital-projects"?: number;
    "community-board-budget-requests"?: number;
    facilities?: number;
  };
}

export type UpdateExportDataModalProps = Partial<ExportDataModalProps>;

type GetUpdatedTotalsQueryParams = {
  boroughIds?: string[];
  cityCouncilDistrictIds?: string[];
  communityDistrictIds?: string[];
  buffer?: number;
  lons?: number[];
  lats?: number[];
  geometry?: "Point";
  limit: 1;
  offset: 0;
};

export interface ExportDataModalStore extends ExportDataModalProps {
  initializeExportDataModal: ({
    boroughIds,
    cityCouncilDistrictIds,
    communityDistrictIds,
    buffer,
    lats,
    lons,
    managingAgency,
    agencyBudget,
    commitmentsTotalMin,
    commitmentsTotalMax,
    cbbrAgencyCategoryResponseIds,
    cbbrNeedGroupId,
    cbbrPolicyAreaId,
    agencyInitials,
    facilityTypes,
    facilityOversightAgency,
    facilityJurisdictions,
    facilityCategoryIds,
    facilityGroupIds,
    facilitySubgroupIds,
  }: ExportDataModalProps) => void;
  updateDataSetForExport: ({
    dataSetForExport,
  }: UpdateExportDataModalProps) => void;
  getExportDataModalDownloadQuery: () => void;
  clearGeoFilters: () => void;
  clearCapitalProjectFilters: () => void;
  clearCommunityBoardBudgetRequestFilters: () => void;
  clearFacilityFilters: () => void;
  getUpdatedTotalsQueryParams: () => GetUpdatedTotalsQueryParams;
  fetchUpdatedCapitalProjectsTotals: () => void;
  fetchUpdatedCommunityBoardBudgetRequestsTotals: () => void;
  fetchUpdatedFacilitiesTotals: () => void;
  fetchUpdatedTotalsOnClearGeo: () => void;
}

export const createExportDataModalStore: StateCreator<ExportDataModalStore> = (
  set,
  get,
) => ({
  dataSetForExport: "capital-projects",
  totalRecords: {
    "capital-projects": 0,
    "community-board-budget-requests": 0,
    facilities: 0,
  },
  boroughIds: null,
  cityCouncilDistrictIds: null,
  communityDistrictIds: null,
  search: null,
  buffer: null,
  lats: null,
  lons: null,
  managingAgency: null,
  agencyBudget: null,
  commitmentsTotalMin: null,
  commitmentsTotalMax: null,
  cbbrAgencyCategoryResponseIds: null,
  cbbrNeedGroupId: null,
  cbbrPolicyAreaId: null,
  agencyInitials: null,
  facilityTypes: null,
  facilityOversightAgency: null,
  facilityJurisdictions: null,
  facilityCategoryIds: null,
  facilityGroupIds: null,
  facilitySubgroupIds: null,
  initializeExportDataModal: ({
    dataSetForExport,
    totalRecords,
    boroughIds,
    cityCouncilDistrictIds,
    communityDistrictIds,
    search,
    buffer,
    lats,
    lons,
    managingAgency,
    agencyBudget,
    commitmentsTotalMin,
    commitmentsTotalMax,
    cbbrAgencyCategoryResponseIds,
    cbbrNeedGroupId,
    cbbrPolicyAreaId,
    agencyInitials,
    facilityTypes,
    facilityOversightAgency,
    facilityJurisdictions,
    facilityCategoryIds,
    facilityGroupIds,
    facilitySubgroupIds,
  }: ExportDataModalProps) =>
    set(() => ({
      dataSetForExport,
      totalRecords,
      boroughIds,
      cityCouncilDistrictIds,
      communityDistrictIds,
      search,
      buffer,
      lats,
      lons,
      managingAgency,
      agencyBudget,
      commitmentsTotalMin,
      commitmentsTotalMax,
      cbbrAgencyCategoryResponseIds,
      cbbrNeedGroupId,
      cbbrPolicyAreaId,
      agencyInitials,
      facilityTypes,
      facilityOversightAgency,
      facilityJurisdictions,
      facilityCategoryIds,
      facilityGroupIds,
      facilitySubgroupIds,
    })),
  updateDataSetForExport: ({ dataSetForExport }: UpdateExportDataModalProps) =>
    set(() => ({
      dataSetForExport,
    })),
  getExportDataModalDownloadQuery() {
    const {
      dataSetForExport,
      boroughIds,
      cityCouncilDistrictIds,
      communityDistrictIds,
      buffer,
      lats,
      lons,
      managingAgency,
      agencyBudget,
      commitmentsTotalMin,
      commitmentsTotalMax,
      cbbrAgencyCategoryResponseIds,
      cbbrNeedGroupId,
      cbbrPolicyAreaId,
      agencyInitials,
      facilityTypes,
      facilityOversightAgency,
      facilityJurisdictions,
      facilityCategoryIds,
      facilityGroupIds,
      facilitySubgroupIds,
    } = get();
    const downloadQueryParamsObject = {
      // Geo
      ...(boroughIds !== null ? { boroughIds: boroughIds.join(",") } : {}),
      ...(communityDistrictIds !== null
        ? { communityDistrictIds: communityDistrictIds.join(",") }
        : {}),
      ...(cityCouncilDistrictIds !== null
        ? { cityCouncilDistrictIds: cityCouncilDistrictIds.join(",") }
        : {}),
      ...(buffer !== null && lats !== null && lons !== null
        ? { buffer, lats, lons, geometry: "Point" }
        : {}),

      // Dataset-specific
      ...(dataSetForExport === "capital-projects"
        ? {
            ...(managingAgency !== null ? { managingAgency } : {}),
            ...(agencyBudget !== null ? { agencyBudget } : {}),
            ...(commitmentsTotalMin !== null ? { commitmentsTotalMin } : {}),
            ...(commitmentsTotalMax !== null ? { commitmentsTotalMax } : {}),
          }
        : {}),

      ...(dataSetForExport === "community-board-budget-requests"
        ? {
            cbbrType: "C",
            ...(cbbrAgencyCategoryResponseIds !== null
              ? { cbbrAgencyCategoryResponseIds }
              : {}),
            ...(cbbrNeedGroupId !== null ? { cbbrNeedGroupId } : {}),
            ...(cbbrPolicyAreaId !== null ? { cbbrPolicyAreaId } : {}),
            ...(agencyInitials !== null ? { agencyInitials } : {}),
          }
        : {}),

      ...(dataSetForExport === "facilities"
        ? {
            ...(facilityTypes !== null ? { facilityTypes } : {}),
            ...(facilityOversightAgency !== null
              ? { facilityOversightAgency }
              : {}),
            ...(facilityJurisdictions !== null
              ? { facilityJurisdictions }
              : {}),
            ...(facilityCategoryIds !== null ? { facilityCategoryIds } : {}),
            ...(facilityGroupIds !== null ? { facilityGroupIds } : {}),
            ...(facilitySubgroupIds !== null ? { facilitySubgroupIds } : {}),
          }
        : {}),
    };

    const downloadQueryParamsString = new URLSearchParams(
      downloadQueryParamsObject,
    ).toString();

    return `api/${dataSetForExport}/csv${downloadQueryParamsString.length > 0 ? `?${downloadQueryParamsString}` : ""}`;
  },
  clearGeoFilters: () => {
    set(() => ({
      boroughIds: null,
      cityCouncilDistrictIds: null,
      communityDistrictIds: null,
      search: null,
      buffer: null,
      lats: null,
      lons: null,
    }));
    get().fetchUpdatedTotalsOnClearGeo();
  },
  clearCapitalProjectFilters: () => {
    set(() => ({
      managingAgency: null,
      agencyBudget: null,
      commitmentsTotalMin: null,
      commitmentsTotalMax: null,
    }));
    get().fetchUpdatedCapitalProjectsTotals();
  },
  clearCommunityBoardBudgetRequestFilters: () => {
    set(() => ({
      cbbrAgencyCategoryResponseIds: null,
      cbbrNeedGroupId: null,
      cbbrPolicyAreaId: null,
      agencyInitials: null,
    }));
    get().fetchUpdatedCommunityBoardBudgetRequestsTotals();
  },
  clearFacilityFilters: () => {
    set(() => ({
      facilityTypes: null,
      facilityOversightAgency: null,
      facilityJurisdictions: null,
      facilityCategoryIds: null,
      facilityGroupIds: null,
      facilitySubgroupIds: null,
    }));
    get().fetchUpdatedFacilitiesTotals();
  },
  getUpdatedTotalsQueryParams: () => {
    const {
      boroughIds,
      cityCouncilDistrictIds,
      communityDistrictIds,
      buffer,
      lats,
      lons,
    } = get();
    return {
      boroughIds: boroughIds === null ? undefined : boroughIds,
      cityCouncilDistrictIds:
        cityCouncilDistrictIds === null ? undefined : cityCouncilDistrictIds,
      communityDistrictIds:
        communityDistrictIds === null ? undefined : communityDistrictIds,
      buffer: buffer === null ? undefined : parseInt(buffer),
      lons:
        lons === null ? undefined : lons.split(",").map((x) => parseFloat(x)),
      lats:
        lats === null ? undefined : lats.split(",").map((x) => parseFloat(x)),
      geometry: buffer === null ? undefined : "Point",
      limit: 1,
      offset: 0,
    };
  },
  async fetchUpdatedCapitalProjectsTotals() {
    const { getUpdatedTotalsQueryParams, totalRecords } = get();
    const updatedQueryParams = getUpdatedTotalsQueryParams();

    const capitalProjects = await findCapitalProjects(updatedQueryParams, {
      baseURL: `${zoningApiUrl}/api`,
    });

    set(() => ({
      totalRecords: {
        ...totalRecords,
        "capital-projects": capitalProjects.totalProjects,
      },
    }));
  },
  async fetchUpdatedCommunityBoardBudgetRequestsTotals() {
    const { getUpdatedTotalsQueryParams, totalRecords } = get();
    const updatedQueryParams = getUpdatedTotalsQueryParams();

    const cbbrs = await findCommunityBoardBudgetRequests(
      {
        ...updatedQueryParams,
        cbbrType: "C",
      },
      {
        baseURL: `${zoningApiUrl}/api`,
      },
    );

    set(() => ({
      totalRecords: {
        ...totalRecords,
        "community-board-budget-requests": cbbrs.totalBudgetRequests,
      },
    }));
  },
  async fetchUpdatedFacilitiesTotals() {
    const { getUpdatedTotalsQueryParams, totalRecords } = get();
    const updatedQueryParams = getUpdatedTotalsQueryParams();

    const facilities = await findFacilities(updatedQueryParams, {
      baseURL: `${zoningApiUrl}/api`,
    });

    set(() => ({
      totalRecords: {
        ...totalRecords,
        facilities: facilities.totalFacilities,
      },
    }));
  },
  async fetchUpdatedTotalsOnClearGeo() {
    const {
      managingAgency,
      agencyBudget,
      commitmentsTotalMin,
      commitmentsTotalMax,
      cbbrAgencyCategoryResponseIds,
      cbbrNeedGroupId,
      cbbrPolicyAreaId,
      agencyInitials,
      facilityJurisdictions,
      facilityTypes,
      facilityOversightAgency,
      facilityCategoryIds,
      facilityGroupIds,
      facilitySubgroupIds,
    } = get();
    const capitalProjectsPromise = findCapitalProjects(
      {
        ...(managingAgency === null ? {} : { managingAgency }),
        ...(agencyBudget === null ? {} : { agencyBudget }),
        ...(commitmentsTotalMin === null ? {} : { commitmentsTotalMin }),
        ...(commitmentsTotalMax === null ? {} : { commitmentsTotalMax }),
        isMapped: true,
        limit: 1,
        offset: 0,
      },
      {
        baseURL: `${zoningApiUrl}/api`,
      },
    );

    const budgetRequestsPromise = findCommunityBoardBudgetRequests(
      {
        cbbrType: "C",
        cbbrAgencyCategoryResponseIds:
          cbbrAgencyCategoryResponseIds === null
            ? undefined
            : cbbrAgencyCategoryResponseIds
                .split(",")
                .map((item) => parseInt(item)),
        cbbrNeedGroupId:
          cbbrNeedGroupId === null ? undefined : parseInt(cbbrNeedGroupId),
        cbbrPolicyAreaId:
          cbbrPolicyAreaId === null ? undefined : parseInt(cbbrPolicyAreaId),
        agencyInitials: agencyInitials === null ? undefined : agencyInitials,
        limit: 1,
        offset: 0,
      },
      {
        baseURL: `${zoningApiUrl}/api`,
      },
    );

    const facilitiesPromise = findFacilities(
      {
        facilityJurisdictions:
          facilityJurisdictions === null
            ? undefined
            : (facilityJurisdictions.split(
                ",",
              ) as FindFacilitiesQueryParamsFacilityJurisdictionsEnumKey[]),
        facilityOperatorTypes:
          facilityTypes === null
            ? undefined
            : (facilityTypes.split(
                ",",
              ) as FindFacilitiesQueryParamsFacilityOperatorTypesEnumKey[]),
        facilityOversightAgency:
          facilityOversightAgency === null
            ? undefined
            : facilityOversightAgency,
        facilityCategoryIds:
          facilityCategoryIds === null
            ? undefined
            : facilityCategoryIds.split(",").map((item) => parseInt(item)),
        facilityGroupIds:
          facilityGroupIds === null
            ? undefined
            : facilityGroupIds.split(",").map((item) => parseInt(item)),
        facilitySubgroupIds:
          facilitySubgroupIds === null
            ? undefined
            : facilitySubgroupIds.split(",").map((item) => parseInt(item)),
        limit: 1,
        offset: 0,
      },
      {
        baseURL: `${zoningApiUrl}/api`,
      },
    );

    const [
      capitalProjectsResponse,
      budgetRequestsResponse,
      facilitiesResponse,
    ] = await Promise.all([
      capitalProjectsPromise,
      budgetRequestsPromise,
      facilitiesPromise,
    ]);

    set(() => ({
      totalRecords: {
        "capital-projects": capitalProjectsResponse.totalProjects,
        "community-board-budget-requests":
          budgetRequestsResponse.totalBudgetRequests,
        facilities: facilitiesResponse.totalFacilities,
      },
    }));
  },
});
