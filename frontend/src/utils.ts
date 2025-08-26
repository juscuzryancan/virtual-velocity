import { APIError } from "./types";

export function isAPIError(obj: any): obj is APIError {
  return "data" in obj && "message" in obj.data;
}
