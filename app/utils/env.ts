import { envSchema } from "~/schema/env";

const { VITE_ZONING_API_URL, VITE_BASEMAP_URL, VITE_CPDB_DATA_URL } =
  import.meta.env;

export const env = envSchema.parse({
  zoningApiUrl: VITE_ZONING_API_URL,
  basemapUrl: VITE_BASEMAP_URL,
  cpdbDataUrl: VITE_CPDB_DATA_URL,
});
