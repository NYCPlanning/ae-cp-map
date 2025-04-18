import { z } from "zod";
import { errorSchema } from "./errorSchema";

export const findCommunityDistrictTilesPathParamsSchema = z.object({
  z: z.number().int().describe("viewport zoom component"),
  x: z.number().int().describe("viewport x component"),
  y: z.number().int().describe("viewport y component"),
});
/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export const findCommunityDistrictTiles200Schema = z.string();
/**
 * @description Invalid client request
 */
export const findCommunityDistrictTiles400Schema = z.lazy(() => errorSchema);
/**
 * @description Server side error
 */
export const findCommunityDistrictTiles500Schema = z.lazy(() => errorSchema);
/**
 * @description A protobuf file formatted as Mapbox Vector Tile
 */
export const findCommunityDistrictTilesQueryResponseSchema = z.string();
