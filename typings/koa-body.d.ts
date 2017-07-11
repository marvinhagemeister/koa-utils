declare module "koa-body" {
  import { Middleware } from "koa";
  const bodyParser: () => Middleware;

  export = bodyParser;
}
