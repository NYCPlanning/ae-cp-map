import { createError } from "./createError";
import RandExp from "randexp";
import type { NotFound } from "../types/NotFound";

export function createNotFound(): NonNullable<NotFound> {
  return createError();
}
