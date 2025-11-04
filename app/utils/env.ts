const envFlags = import.meta.env;

function validateEnv(envFlags: ImportMetaEnv) {
  const missing: string[] = [];

  if (
    envFlags.VITE_ZONING_API_URL === undefined ||
    envFlags.VITE_ZONING_API_URL === ""
  )
    missing.push("VITE_ZONING_API_URL");
  if (
    envFlags.VITE_BASEMAP_URL === undefined ||
    envFlags.VITE_BASEMAP_URL === ""
  )
    missing.push("VITE_BASEMAP_URL");
  if (
    envFlags.VITE_CPDB_DATA_URL === undefined ||
    envFlags.VITE_CPDB_DATA_URL === ""
  )
    missing.push("VITE_CPDB_DATA_URL");

  if (missing.length > 0) {
    throw new Error(`Missing env vars: ${missing.join(", ")}`);
  }

  return {
    zoningApiUrl: envFlags.VITE_ZONING_API_URL,
    basemapUrl: envFlags.VITE_BASEMAP_URL,
    cpdbDataUrl: envFlags.VITE_CPDB_DATA_URL,
  };
}

export const env = validateEnv(envFlags);
