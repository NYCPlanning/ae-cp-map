import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CityCouncilDistrict } from "../types/CityCouncilDistrict";

export function createCityCouncilDistrict(
  data: NonNullable<Partial<CityCouncilDistrict>> = {},
): NonNullable<CityCouncilDistrict> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([0-9]{1,2})$").gen(),
      ]),
    },
    ...data,
  };
}
