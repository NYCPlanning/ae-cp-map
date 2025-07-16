import { reactRouter } from "@react-router/dev/vite";
// import { installGlobals } from "react-router";
import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// installGlobals();

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    reactRouter({
      ignoredRouteFiles: ["**/?(*.)+(spec|test).[tj]s?(x)"],
      future: {
        unstable_optimizeDeps: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
        v3_routeConfig: true,
      },
    }),
  ],
  resolve: {
    alias: [{ find: "~", replacement: path.resolve(__dirname, "./app") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.ts",
    include: ["**/*.test.?(c|m)[jt]s?(x)"],
  },
});
