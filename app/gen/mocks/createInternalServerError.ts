import { createError } from "./createError";
import RandExp from "randexp";
import type { InternalServerError } from "../types/InternalServerError";

export function createInternalServerError(): NonNullable<InternalServerError> {
  return createError();
}
