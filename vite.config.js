import { reactRouter } from "@react-router/dev/vite";
// import { installGlobals } from "react-router";
import { defineConfig } from "vite";
import path from "path";

// installGlobals();

export default defineConfig({
  plugins: [
    reactRouter(),
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
