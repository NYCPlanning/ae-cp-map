import { createPosition } from "./createPosition";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { MultiPoint } from "../types/MultiPoint";

/**
 * @description A geojson implementation of a MultiPoint Simple Feature
 */
export function createMultiPoint(
  data: NonNullable<Partial<MultiPoint>> = {},
): NonNullable<MultiPoint> {
  return {
    ...{
      type: faker.helpers.arrayElement<any>(["MultiPoint"]),
      coordinates: faker.helpers.arrayElements([createPosition()]) as any,
    },
    ...data,
  };
}
