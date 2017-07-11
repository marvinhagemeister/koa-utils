import { Middleware, Context } from "koa";
import * as logger from "koa-logger";
import * as compose from "koa-compose";
import * as bodyParser from "koa-body";
import { handleErrors } from "./errors";

export function restMiddleware() {
  const m: Middleware[] = [];

  if (process.env.NODE_ENV === "development") {
    m.push(logger());
  }

  m.push(bodyParser());
  return compose(m);
}
