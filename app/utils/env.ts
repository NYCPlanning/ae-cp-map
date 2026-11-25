import { envSchema } from "~/schema/env";

const { VITE_ZONING_API_URL, VITE_BASEMAP_URL, VITE_STATE_OF_GOOD_REPAIR } =
  import.meta.env;

export const env = envSchema.parse({
  zoningApiUrl: VITE_ZONING_API_URL,
  basemapUrl: VITE_BASEMAP_URL,
  stateOfGoodRepair: VITE_STATE_OF_GOOD_REPAIR,
});
