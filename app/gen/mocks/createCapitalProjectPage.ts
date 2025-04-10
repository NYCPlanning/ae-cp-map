import { createPage } from "./createPage";
import { createCapitalProject } from "./createCapitalProject";
import { faker } from "@faker-js/faker";
import RandExp from "randexp";
import type { CapitalProjectPage } from "../types/CapitalProjectPage";

export function createCapitalProjectPage(
  data?: NonNullable<Partial<CapitalProjectPage>>,
): NonNullable<CapitalProjectPage> {
  return Object.assign({}, createPage(), {
    capitalProjects: faker.helpers.arrayElements([
      createCapitalProject(),
    ]) as any,
    totalProjects: faker.number.int(),
  });
}
