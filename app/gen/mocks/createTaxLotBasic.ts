import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { TaxLotBasic } from "../types/TaxLotBasic";

export function createTaxLotBasic(
  data: NonNullable<Partial<TaxLotBasic>> = {},
): NonNullable<TaxLotBasic> {
  return {
    ...{
      bbl: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([0-9]{10})$").gen(),
      ]),
      boroughId: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([0-9])$").gen(),
      ]),
      block: faker.string.alpha(),
      lot: faker.string.alpha(),
      address: faker.string.alpha(),
      landUseId: faker.string.alpha(),
    },
    ...data,
  };
}
