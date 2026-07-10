export type BoroughId = null | string;
export type BoroughIds = null | string[];
export type BoundaryType = null | "cd" | "ccd" | "borough";
export type BoundaryId = null | string;
export type ManagingAgencyInitials = null | string;
export type AgencyBudgetType = null | string;
export type CommitmentsTotalMin = null | string;
export type CommitmentsTotalMax = null | string;
export type CommitmentsTotalMinInputValue = string;
export type CommitmentsTotalMinSelectValue = string;
export type CommitmentsTotalMaxInputValue = string;
export type CommitmentsTotalMaxSelectValue = string;
export type CommitmentTotalInputsAreValid = boolean;
export type CommunityBoardBudgetRequestPolicyAreaId = null | string;
export type CommunityBoardBudgetRequestNeedGroupId = null | string;
export type CommunityBoardBudgetRequestAgencyInitials = string | null;
export type CommunityBoardBudgetRequestAgencyCategoryResponseId = string | null;
export type FacilityType = "Public" | "Non-public" | "Not specified";
export type FacilityTypes = FacilityType[] | null;
export type FacilityOversightAgency = null | string;
export type FacilityJurisdiction =
  | "City"
  | "State"
  | "Federal"
  | "County"
  | "Not specified";
export type FacilityJurisdictions = FacilityJurisdiction[] | null;
export type FacilityCategoryIds = number[] | null;
export type FacilityGroupIds = number[] | null;
export type FacilitySubgroupIds = number[] | null;

export type AdminQueryParams = {
  boundaryType?: BoundaryType;
  boundaryId?: BoundaryId;
  boroughId?: BoroughId;
  boroughIds?: string | null;
  cityCouncilDistrictIds?: string | null;
  communityDistrictIds?: string | null;
};

export type AttributeParams = {
  managingAgency: ManagingAgencyInitials;
  agencyBudget: AgencyBudgetType;
  commitmentsTotalMin: CommitmentsTotalMin;
  commitmentsTotalMax: CommitmentsTotalMax;
  cbbrPolicyAreaId?: CommunityBoardBudgetRequestPolicyAreaId;
  cbbrNeedGroupId?: CommunityBoardBudgetRequestNeedGroupId;
  cbbrAgencyInitials?: CommunityBoardBudgetRequestAgencyInitials;
  cbbrAgencyCategoryResponseIds?: CommunityBoardBudgetRequestAgencyCategoryResponseId;
  facilityTypes?: FacilityTypes;
  facilityOversightAgency?: FacilityOversightAgency;
  facilityJurisdictions?: FacilityJurisdictions;
  facilityCategoryIds?: FacilityCategoryIds;
  facilityGroupIds?: FacilityGroupIds;
  facilitySubgroupIds?: FacilitySubgroupIds;
};

export type AttributeQueryParams = {
  managingAgency?: ManagingAgencyInitials;
  agencyBudget?: AgencyBudgetType;
  commitmentsTotalMin?: CommitmentsTotalMin;
  commitmentsTotalMax?: CommitmentsTotalMax;
  cbbrPolicyAreaId?: CommunityBoardBudgetRequestPolicyAreaId;
  cbbrNeedGroupId?: CommunityBoardBudgetRequestNeedGroupId;
  cbbrAgencyInitials?: CommunityBoardBudgetRequestAgencyInitials;
  cbbrAgencyCategoryResponseId?: CommunityBoardBudgetRequestAgencyCategoryResponseId;
};

export type PaginationQueryParams = {
  page?: number;
};

export type AddressQueryParams = {
  search?: string;
  radius?: number;
  pin?: number[];
};

export type LayerParamKey = "capitalProjects" | "cbbr" | "facilities";

export type LayersParam = LayerParamKey[] | [""] | null;

export type LayersQueryParams = {
  layers?: LayersParam;
};

export type LayerParamValue = "off" | undefined;

export type LayerQueryParams = Partial<Record<LayerParamKey, LayerParamValue>>;

export type QueryParams = Partial<
  AdminQueryParams &
    AttributeParams &
    PaginationQueryParams &
    LayerQueryParams &
    LayersQueryParams &
    AddressQueryParams
>;

export type ProjectAmountMenuParams = {
  commitmentsTotalMinInputValue: CommitmentsTotalMinInputValue;
  commitmentsTotalMinSelectValue: CommitmentsTotalMinSelectValue;
  commitmentsTotalMaxInputValue: CommitmentsTotalMaxInputValue;
  commitmentsTotalMaxSelectValue: CommitmentsTotalMaxSelectValue;
  commitmentTotalInputsAreValid: CommitmentTotalInputsAreValid;
};

export type PageParamKey = "cbbrPage" | "cpPage" | "facilitiesPage";
