import { faker } from "@faker-js/faker";
import type { CityCouncilDistrict } from "../types/CityCouncilDistrict";

export function createCityCouncilDistrict(
  data: NonNullable<Partial<CityCouncilDistrict>> = {},
): NonNullable<CityCouncilDistrict> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("^([0-9]{1,2})$")),
      ]),
    },
    ...data,
  };
}
