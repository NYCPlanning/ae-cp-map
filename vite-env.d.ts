interface ImportMetaEnv {
  readonly VITE_ZONING_API_URL?: string;
  readonly VITE_BASEMAP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
