import { z } from "zod";

export type QueryParam = string | null;
const passthrough = (value: QueryParam) => value;

const layerParamSchema = z.enum(["off"]);
const layerParser = (value: QueryParam) => {
  return layerParamSchema.parse(value);
};

const districtTypeParamSchema = z.enum(["cd", "ccd"]).nullable();
const districtTypeParser = (value: QueryParam) =>
  districtTypeParamSchema.parse(value);

const integerLikeParamSchema = z.string().regex(new RegExp("^([0-9])+$"));
const integerLikeStringParser = (value: QueryParam) =>
  integerLikeParamSchema.nullable().parse(value);

const integerParser = (value: QueryParam) => {
  if (value === null) return value;
  const f = parseFloat(value);
  if (isNaN(f))
    throw new Error(`Value ${value} is not a number, expected integer`);
  const i = parseInt(value);
  if (f !== i) throw new Error(`Expected integer for value ${value}`);
  return i;
};

const integerArrayParser = (value: QueryParam) => {
  if (value === null) return value;
  return value
    .split(",")
    .map((item) => parseInt(integerLikeParamSchema.parse(item)));
};

const pageParser = (value: QueryParam) => {
  const p = integerParser(value);
  return p !== null ? p : 1;
};

export const SEARCH_PARAMS = {
  ATTRIBUTE: {
    COMMUNITY_BOARD_BUDGET_REQUEST: {
      NEED_GROUP_ID: {
        KEY: "cbbrNeedGroupId",
        PARSER: integerParser,
      },
      POLICY_AREA_ID: {
        KEY: "cbbrPolicyAreaId",
        PARSER: integerParser,
      },
      AGENCY_INITIALS: { KEY: "cbbrAgencyInitials", PARSER: passthrough },
      AGENCY_RESPONSE_CATEGORY_IDS: {
        KEY: "cbbrAgencyCategoryResponseIds",
        PARSER: integerArrayParser,
      },
    },
    CAPITAL_PROJECT: {
      AGENCY_BUDGET_ID: { KEY: "cpAgencyBudgetId", PARSER: passthrough },
      MANAGING_AGENCY_INITIALS: {
        KEY: "cpManagingAgency",
        PARSER: passthrough,
      },
      COMMITMENTS_TOTAL_MIN: {
        KEY: "cpCommitmentsTotalMin",
        PARSER: passthrough,
      },
      COMMITMENTS_TOTAL_MAX: {
        KEY: "cpCommitmentsTotalMax",
        PARSER: passthrough,
      },
    },
  },
  LAYER: {
    COMMUNITY_BOARD_BUDGET_REQUEST: { KEY: "cbbrLayer", PARSER: layerParser },
    CAPITAL_PROJECT: { KEY: "cpLayer", PARSER: layerParser },
  },
  PAGE: {
    COMMUNITY_BOARD_BUDGET_REQUEST: { KEY: "cbbrPage", PARSER: pageParser },
    CAPITAL_PROJECT: { KEY: "cpPage", PARSER: pageParser },
  },
  GEOGRAPHY: {
    DISTRICT_TYPE: { KEY: "districtType", PARSER: districtTypeParser },
    DISTRICT_ID: { KEY: "districtId", PARSER: integerLikeStringParser },
    BOROUGH_ID: { KEY: "boroughId", PARSER: integerLikeStringParser },
  },
} as const;
