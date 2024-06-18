import { createError } from "./createError";
import type { NotFound } from "../types/NotFound";

export function createNotFound(): NonNullable<NotFound> {
  return createError();
}
