import { APIError } from "./types";

//eslint-disable-next-line
export function isAPIError(obj: any): obj is APIError {
  return "data" in obj && "message" in obj.data;
}
