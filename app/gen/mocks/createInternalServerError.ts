import { createError } from "./createError";
import type { InternalServerError } from "../types/InternalServerError";

export function createInternalServerError(): NonNullable<InternalServerError> {
  return createError();
}
