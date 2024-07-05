import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import path from "path";

installGlobals();

export default defineConfig({
  plugins: [
    !process.env.VITEST &&
      remix({
        ignoredRouteFiles: ["**/?(*.)+(spec|test).[tj]s?(x)"],
      }),
  ],
  resolve: { 
    alias: [{ find: "~", replacement: path.resolve(__dirname, "./app")}]
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.ts",
    include: ["**/*.test.?(c|m)[jt]s?(x)"],
  },
});
