export type BoroughId = null | string;
export type DistrictType = null | "cd" | "ccd";
export type DistrictId = null | string;
export type ManagingAgencyAcronym = null | string;
export type AgencyBudgetType = null | string;
export type CommitmentsTotalMin = null | string;
export type CommitmentsTotalMax = null | string;
export type CommitmentsTotalMinInputValue = string;
export type CommitmentsTotalMinSelectValue = string;
export type CommitmentsTotalMaxInputValue = string;
export type CommitmentsTotalMaxSelectValue = string;
export type CommitmentTotalInputsAreValid = boolean;

export type AdminQueryParams = {
  districtType?: DistrictType;
  districtId?: DistrictId;
  boroughId?: BoroughId;
};

export type AttributeParams = {
  managingAgency: ManagingAgencyAcronym;
  agencyBudget: AgencyBudgetType;
  commitmentsTotalMin: CommitmentsTotalMin;
  commitmentsTotalMax: CommitmentsTotalMax;
};

export type AttributeQueryParams = {
  managingAgency?: ManagingAgencyAcronym;
  agencyBudget?: AgencyBudgetType;
  commitmentsTotalMin?: CommitmentsTotalMin;
  commitmentsTotalMax?: CommitmentsTotalMax;
};

export type PaginationQueryParams = {
  page?: number;
};

export type LayerParamKey = "capitalProjects" | "cbbr";

export type LayerParamValue = "off" | undefined;

export type LayerQueryParams = Partial<Record<LayerParamKey, LayerParamValue>>;

export type QueryParams = Partial<
  AdminQueryParams & AttributeParams & PaginationQueryParams & LayerQueryParams
>;

export type ProjectAmountMenuParams = {
  commitmentsTotalMinInputValue: CommitmentsTotalMinInputValue;
  commitmentsTotalMinSelectValue: CommitmentsTotalMinSelectValue;
  commitmentsTotalMaxInputValue: CommitmentsTotalMaxInputValue;
  commitmentsTotalMaxSelectValue: CommitmentsTotalMaxSelectValue;
  commitmentTotalInputsAreValid: CommitmentTotalInputsAreValid;
};

export type PageParamKey = "cbbrPage" | "cpPage";
