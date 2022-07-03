import { TSchema } from "@sinclair/typebox";

export type httpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "TRACE";

export type Route = {
    path: string;
    method: httpMethod;
    auth?: boolean;
};

export interface Handler {
  handler: Function;
  body?: TSchema;
  response?: TSchema;
}