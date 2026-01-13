import { envSchema } from "~/schema/env";

const {
  VITE_ZONING_API_URL,
  VITE_BASEMAP_URL,
  VITE_CPDB_DATA_URL,
  VITE_FACDB_PHASE_1,
} = import.meta.env;

export const env = envSchema.parse({
  zoningApiUrl: VITE_ZONING_API_URL,
  basemapUrl: VITE_BASEMAP_URL,
  cpdbDataUrl: VITE_CPDB_DATA_URL,
  facDbPhase1: VITE_FACDB_PHASE_1,
});
