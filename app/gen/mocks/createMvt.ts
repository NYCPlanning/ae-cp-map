import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { Mvt } from "../types/Mvt";

export function createMvt(): NonNullable<Mvt> {
  return faker.string.alpha();
}
