import { faker } from "@faker-js/faker";
import type { TaxLotBasic } from "../types/TaxLotBasic";

export function createTaxLotBasic(
  data: NonNullable<Partial<TaxLotBasic>> = {},
): NonNullable<TaxLotBasic> {
  return {
    ...{
      bbl: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("^([0-9]{10})$")),
      ]),
      boroughId: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("\\b[1-9]\\b")),
      ]),
      block: faker.string.alpha(),
      lot: faker.string.alpha(),
      address: faker.string.alpha(),
      landUseId: faker.string.alpha(),
    },
    ...data,
  };
}
