import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    !process.env.VITEST &&
      remix({
        ignoredRouteFiles: ["**/?(*.)+(spec|test).[tj]s?(x)", "**/*.css"],
      }),
    tsconfigPaths(),
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
