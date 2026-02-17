import { defineConfig } from "@kubb/core";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginClient } from "@kubb/plugin-client";
import { pluginFaker } from "@kubb/plugin-faker";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginMsw } from "@kubb/plugin-msw";

export default defineConfig({
  root: ".",
  input: {
    path: "https://raw.githubusercontent.com/NYCPlanning/ae-zoning-api/main/openapi/openapi.yaml",
  },
  output: {
    path: "./app/gen",
    clean: true,
    extension: {
      ".ts": ".js",
    },
  },
  plugins: [
    pluginOas({}),
    pluginTs({}),
    pluginZod({
      output: {
        path: "./zod",
      },
    }),
    pluginClient({
      output: {
        path: "./axios",
      },
    }),
    pluginFaker({
      regexGenerator: "randexp",
    }),
    pluginMsw({
      output: {
        path: "./mocks",
      },
      handlers: true,
    }),
  ],
});
