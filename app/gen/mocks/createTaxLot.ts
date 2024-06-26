import { createBorough } from "./createBorough";
import { createLandUse } from "./createLandUse";
import { faker } from "@faker-js/faker";
import type { TaxLot } from "../types/TaxLot";

export function createTaxLot(
  data: NonNullable<Partial<TaxLot>> = {},
): NonNullable<TaxLot> {
  return {
    ...{
      bbl: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("^([0-9]{10})$")),
      ]),
      borough: createBorough(),
      block: faker.string.alpha(),
      lot: faker.string.alpha(),
      address: faker.string.alpha(),
      landUse: createLandUse(),
    },
    ...data,
  };
}
