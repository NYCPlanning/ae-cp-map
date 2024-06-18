import { createPosition } from "./createPosition";
import { faker } from "@faker-js/faker";
import type { MultiPolygon } from "../types/MultiPolygon";

/**
 * @description A geojson implementation of a MultiPolygon Simple Feature
 */
export function createMultiPolygon(
  data: NonNullable<Partial<MultiPolygon>> = {},
): NonNullable<MultiPolygon> {
  return {
    ...{
      type: faker.helpers.arrayElement<any>(["MultiPolygon"]),
      coordinates: faker.helpers.arrayElements([
        faker.helpers.arrayElements([
          faker.helpers.arrayElements([createPosition()]) as any,
        ]) as any,
      ]) as any,
    },
    ...data,
  };
}
