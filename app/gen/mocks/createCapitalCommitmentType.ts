import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CapitalCommitmentType } from "../types/CapitalCommitmentType";

export function createCapitalCommitmentType(
  data: NonNullable<Partial<CapitalCommitmentType>> = {},
): NonNullable<CapitalCommitmentType> {
  return {
    ...{ code: faker.string.alpha(), description: faker.string.alpha() },
    ...data,
  };
}
