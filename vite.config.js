import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [
    remix({
        ignoredRouteFiles: ["**/?(*.)+(spec|test).[tj]s?(x)"],
        future: {
          unstable_optimizeDeps: true,
        }
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
