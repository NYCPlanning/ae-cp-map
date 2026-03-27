import { z } from "zod";
import { addressResultSchema, addressFeatureSchema } from "../zod";

export type AddressResult = z.infer<typeof addressResultSchema>;

export type AddressFeature = z.infer<typeof addressFeatureSchema>;
