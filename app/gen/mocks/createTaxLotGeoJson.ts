import { createMultiPolygon } from "./createMultiPolygon";
import { createTaxLot } from "./createTaxLot";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { TaxLotGeoJson } from "../types/TaxLotGeoJson";

export function createTaxLotGeoJson(
  data: NonNullable<Partial<TaxLotGeoJson>> = {},
): NonNullable<TaxLotGeoJson> {
  return {
    ...{
      id: faker.string.alpha(),
      type: faker.helpers.arrayElement<any>(["Feature"]),
      geometry: createMultiPolygon(),
      properties: createTaxLot(),
    },
    ...data,
  };
}
