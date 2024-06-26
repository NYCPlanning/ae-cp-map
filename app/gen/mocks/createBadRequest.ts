import { createError } from "./createError";
import type { BadRequest } from "../types/BadRequest";

export function createBadRequest(): NonNullable<BadRequest> {
  return createError();
}
