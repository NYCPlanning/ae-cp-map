import { faker } from "@faker-js/faker";
import type { Position } from "../types/Position";

/**
 * @description The fundamental spatial construct
 */
export function createPosition(
  data: NonNullable<Partial<Position>> = [],
): NonNullable<Position> {
  return [
    ...(faker.helpers.arrayElements([faker.number.float()]) as any),
    ...data,
  ];
}
