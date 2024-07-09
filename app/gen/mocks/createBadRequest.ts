import { createError } from "./createError";
import RandExp from "randexp";
import type { BadRequest } from "../types/BadRequest";

export function createBadRequest(): NonNullable<BadRequest> {
  return createError();
}
