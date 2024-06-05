import { defineConfig } from "@kubb/core";
import { pluginTs } from "@kubb/swagger-ts";
import { pluginZod } from "@kubb/swagger-zod";
import { pluginClient } from "@kubb/swagger-client";
import { pluginFaker } from "@kubb/swagger-faker";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginMsw } from "@kubb/swagger-msw";

export default defineConfig({
  root: ".",
  input: {
    path: "https://raw.githubusercontent.com/NYCPlanning/ae-zoning-api/main/openapi/openapi.yaml",
  },
  output: {
    path: "./app/gen",
    clean: true,
  },
  plugins: [
    pluginOas({
      output: false,
    }),
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
    pluginFaker({}),
    pluginMsw({
      output: {
        path: "./mocks",
      },
    }),
  ],
});
