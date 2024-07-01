import { faker } from "@faker-js/faker";
import type { Mvt } from "../types/Mvt";

export function createMvt(): NonNullable<Mvt> {
  return faker.string.alpha();
}
