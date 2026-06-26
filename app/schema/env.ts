import { z } from "zod";

export const envSchema = z.object({
  zoningApiUrl: z.string().min(1, "VITE_ZONING_API_URL is required"),
  basemapUrl: z.string().min(1, "VITE_BASEMAP_URL is required"),
  cpdbDataUrl: z.string().min(1, "VITE_CPDB_DATA_URL is required"),
  facDbPhase2: z.string().min(1, "VITE_FACDB_PHASE_2 is required"),
  facDbPhase3: z.string().min(1, "VITE_FACDB_PHASE_3 is required"),
  stateOfGoodRepair: z.string().min(1, "VITE_STATE_OF_GOOD_REPAIR is required"),
});
