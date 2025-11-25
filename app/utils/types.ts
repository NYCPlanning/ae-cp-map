import { SEARCH_PARAMS } from "./params";

export type BoroughId = null | string;
export type DistrictType = null | "cd" | "ccd";
export type DistrictId = null | string;
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

export type AdminQueryParams = {
  districtType?: DistrictType;
  districtId?: DistrictId;
  boroughId?: BoroughId;
};

export type AttributeParams = {
  managingAgency: ManagingAgencyInitials;
  agencyBudget: AgencyBudgetType;
  commitmentsTotalMin: CommitmentsTotalMin;
  commitmentsTotalMax: CommitmentsTotalMax;
  cbbrPolicyAreaId: CommunityBoardBudgetRequestPolicyAreaId;
  cbbrNeedGroupId: CommunityBoardBudgetRequestNeedGroupId;
  cbbrAgencyInitials: CommunityBoardBudgetRequestAgencyInitials;
  cbbrAgencyCategoryResponseIds: CommunityBoardBudgetRequestAgencyCategoryResponseId;
};

export type PaginationQueryParams = {
  page?: number;
};

export type LayerParamKey = "capitalProjects" | "cbbr";

export type LayerParamValue = "off" | undefined;

export type LayerQueryParams = Partial<Record<LayerParamKey, LayerParamValue>>;

// export type QueryParams = Partial<
//   AdminQueryParams & AttributeParams & PaginationQueryParams & LayerQueryParams
// >;

export type QueryParams = Partial<{
  [SEARCH_PARAMS.ATTRIBUTE.CAPITAL_PROJECT.AGENCY_BUDGET_ID.KEY]: ReturnType<
    typeof SEARCH_PARAMS.ATTRIBUTE.CAPITAL_PROJECT.AGENCY_BUDGET_ID.PARSER
  >;
  [SEARCH_PARAMS.ATTRIBUTE.CAPITAL_PROJECT.COMMITMENTS_TOTAL_MAX
    .KEY]: ReturnType<
    typeof SEARCH_PARAMS.ATTRIBUTE.CAPITAL_PROJECT.COMMITMENTS_TOTAL_MAX.PARSER
  >;
  [SEARCH_PARAMS.ATTRIBUTE.CAPITAL_PROJECT.COMMITMENTS_TOTAL_MIN
    .KEY]: ReturnType<
    typeof SEARCH_PARAMS.ATTRIBUTE.CAPITAL_PROJECT.COMMITMENTS_TOTAL_MIN.PARSER
  >;
  [SEARCH_PARAMS.ATTRIBUTE.CAPITAL_PROJECT.MANAGING_AGENCY_INITIALS
    .KEY]: ReturnType<
    typeof SEARCH_PARAMS.ATTRIBUTE.CAPITAL_PROJECT.MANAGING_AGENCY_INITIALS.PARSER
  >;
  [SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.AGENCY_INITIALS
    .KEY]: ReturnType<
    typeof SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.AGENCY_INITIALS.PARSER
  >;
  [SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST
    .AGENCY_RESPONSE_CATEGORY_IDS.KEY]: ReturnType<
    typeof SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.AGENCY_RESPONSE_CATEGORY_IDS.PARSER
  >;
  [SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.NEED_GROUP_ID
    .KEY]: ReturnType<
    typeof SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.NEED_GROUP_ID.PARSER
  >;
  [SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.POLICY_AREA_ID
    .KEY]: ReturnType<
    typeof SEARCH_PARAMS.ATTRIBUTE.COMMUNITY_BOARD_BUDGET_REQUEST.POLICY_AREA_ID.PARSER
  >;
  [SEARCH_PARAMS.GEOGRAPHY.BOROUGH_ID.KEY]: ReturnType<
    typeof SEARCH_PARAMS.GEOGRAPHY.BOROUGH_ID.PARSER
  >;
  [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_ID.KEY]: ReturnType<
    typeof SEARCH_PARAMS.GEOGRAPHY.DISTRICT_ID.PARSER
  >;
  [SEARCH_PARAMS.GEOGRAPHY.DISTRICT_TYPE.KEY]: ReturnType<
    typeof SEARCH_PARAMS.GEOGRAPHY.DISTRICT_TYPE.PARSER
  >;
  [SEARCH_PARAMS.LAYER.CAPITAL_PROJECT.KEY]: ReturnType<
    typeof SEARCH_PARAMS.LAYER.CAPITAL_PROJECT.PARSER
  >;
  [SEARCH_PARAMS.LAYER.COMMUNITY_BOARD_BUDGET_REQUEST.KEY]: ReturnType<
    typeof SEARCH_PARAMS.LAYER.COMMUNITY_BOARD_BUDGET_REQUEST.PARSER
  >;
  [SEARCH_PARAMS.PAGE.CAPITAL_PROJECT.KEY]: ReturnType<
    typeof SEARCH_PARAMS.PAGE.CAPITAL_PROJECT.PARSER
  >;
  [SEARCH_PARAMS.PAGE.COMMUNITY_BOARD_BUDGET_REQUEST.KEY]: ReturnType<
    typeof SEARCH_PARAMS.PAGE.COMMUNITY_BOARD_BUDGET_REQUEST.PARSER
  >;
}>;

export type ProjectAmountMenuParams = {
  commitmentsTotalMinInputValue: CommitmentsTotalMinInputValue;
  commitmentsTotalMinSelectValue: CommitmentsTotalMinSelectValue;
  commitmentsTotalMaxInputValue: CommitmentsTotalMaxInputValue;
  commitmentsTotalMaxSelectValue: CommitmentsTotalMaxSelectValue;
  commitmentTotalInputsAreValid: CommitmentTotalInputsAreValid;
};

export type PageParamKey = "cbbrPage" | "cpPage";
