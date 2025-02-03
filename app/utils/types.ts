export type BoroughId = null | string;
export type DistrictType = null | "cd" | "ccd";
export type DistrictId = null | string;
export type ManagingAgencyAcronym = null | string;
export type ProjectTypeCode = null | string;
export type AmountMin = null | number;
export type AmountMax = null | number;

export type AdminParams = {
  districtType: DistrictType;
  districtId: DistrictId;
  boroughId: BoroughId;
};

export type AttributeParams = {
  managingAgency: ManagingAgencyAcronym;
  projectType: ProjectTypeCode;
  min: AmountMin;
  max: AmountMax;
};

export type SearchParamChanges = Record<
  string,
  string | number | null | undefined
>;
