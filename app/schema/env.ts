import { z } from "zod";

const envSchema = z.object({
  VITE_ZONING_API_URL: z.string().min(1, "VITE_ZONING_API_URL is required"),
  VITE_BASEMAP_URL: z.string().min(1, "VITE_BASEMAP_URL is required"),
  VITE_CPDB_DATA_URL: z.string().min(1, "VITE_CPDB_DATA_URL is required"),
});

const parsed = envSchema.parse(import.meta.env);

export const env = {
  zoningApiUrl: parsed.VITE_ZONING_API_URL,
  basemapUrl: parsed.VITE_BASEMAP_URL,
  cpdbDataUrl: parsed.VITE_CPDB_DATA_URL,
};
