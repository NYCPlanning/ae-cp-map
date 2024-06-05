import { faker } from "@faker-js/faker";
import type { CommunityDistrict } from "../types/CommunityDistrict";

export function createCommunityDistrict(
  data: NonNullable<Partial<CommunityDistrict>> = {},
): NonNullable<CommunityDistrict> {
  return {
    ...{
      id: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("^([0-9]{2})$")),
      ]),
      boroughId: faker.helpers.arrayElement<any>([
        faker.string.alpha(),
        faker.helpers.fromRegExp(new RegExp("\\b[1-9]\\b")),
      ]),
    },
    ...data,
  };
}
