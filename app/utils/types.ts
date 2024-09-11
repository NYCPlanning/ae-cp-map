export type BoroughId = null | string;
export type DistrictType = null | "cd" | "ccd";
export type DistrictId = null | string;

export type AdminParams = {
  districtType: DistrictType;
  districtId: DistrictId;
  boroughId: BoroughId;
};

export type SearchParamChanges = Record<
  string,
  string | number | null | undefined
>;
