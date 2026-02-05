import { z } from "zod";

export const envSchema = z.object({
  zoningApiUrl: z.string().min(1, "VITE_ZONING_API_URL is required"),
  basemapUrl: z.string().min(1, "VITE_BASEMAP_URL is required"),
  cpdbDataUrl: z.string().min(1, "VITE_CPDB_DATA_URL is required"),
  facDbPhase1: z.string().min(1, "VITE_FACDB_PHASE_1 is required"),
});
