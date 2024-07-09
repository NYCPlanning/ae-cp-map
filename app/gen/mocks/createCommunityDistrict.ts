import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CommunityDistrict } from "../types/CommunityDistrict";

export function createCommunityDistrict(
  data: NonNullable<Partial<CommunityDistrict>> = {},
): NonNullable<CommunityDistrict> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([0-9]{2})$").gen(),
      ]),
      boroughId: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        new RandExp("^([0-9])$").gen(),
      ]),
    },
    ...data,
  };
}
