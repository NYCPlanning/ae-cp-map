import { createCityCouncilDistrict } from "./createCityCouncilDistrict";
import { createMultiPolygon } from "./createMultiPolygon";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CityCouncilDistrictGeoJson } from "../types/CityCouncilDistrictGeoJson";

export function createCityCouncilDistrictGeoJson(
  data: NonNullable<Partial<CityCouncilDistrictGeoJson>> = {},
): NonNullable<CityCouncilDistrictGeoJson> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([0-9]{1,2})$").gen(),
      ]),
      type: faker.helpers.arrayElement<any>(["Feature"]),
      properties: createCityCouncilDistrict(),
      geometry: createMultiPolygon(),
    },
    ...data,
  };
}
