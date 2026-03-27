import { z } from "zod";

export const addressFeatureSchema = z.looseObject({
  geometry: z.looseObject({
    coordinates: z.array(z.number()),
  }),
  properties: z.looseObject({
    id: z.string(),
    name: z.string(),
    borough: z.string(),
  }),
});

export const addressResultSchema = z.looseObject({
  features: z.array(z.lazy(() => addressFeatureSchema)),
});
