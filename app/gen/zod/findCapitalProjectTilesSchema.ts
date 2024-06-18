import { z } from "zod";
import { errorSchema } from "./errorSchema";

export const findCapitalProjectTilesPathParamsSchema = z.object({
  z: z.number().describe("viewport zoom component"),
  x: z.number().describe("viewport x component"),
  y: z.number().describe("viewport y component"),
});
/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export const findCapitalProjectTiles200Schema = z.string();
/**
 * @description Invalid client request
 */
export const findCapitalProjectTiles400Schema = z.lazy(() => errorSchema);
/**
 * @description Server side error
 */
export const findCapitalProjectTiles500Schema = z.lazy(() => errorSchema);
/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export const findCapitalProjectTilesQueryResponseSchema = z.string();
