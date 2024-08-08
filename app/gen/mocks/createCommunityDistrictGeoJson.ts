import { createCommunityDistrict } from "./createCommunityDistrict";
import { createMultiPolygon } from "./createMultiPolygon";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityDistrictGeoJson } from "../types/CommunityDistrictGeoJson";

export function createCommunityDistrictGeoJson(
  data: NonNullable<Partial<CommunityDistrictGeoJson>> = {},
): NonNullable<CommunityDistrictGeoJson> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([0-9]{3})$").gen(),
      ]),
      type: faker.helpers.arrayElement<any>(["Feature"]),
      properties: createCommunityDistrict(),
      geometry: createMultiPolygon(),
    },
    ...data,
  };
}
