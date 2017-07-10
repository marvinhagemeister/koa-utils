import { Context, Middleware } from "koa";

export interface ErrorJson {
  code: number;
  message: string;
}

export interface ResponseJson<T = {}> {
  result: T | null;
  messages: string[];
  success: boolean;
  errors: ErrorJson[];
}

const noop = () => Promise.resolve();

export const handleErrors = (cleanup?: Middleware) => async (
  ctx: Context,
  next: any,
) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    const status = err.status !== undefined ? err.status as number : 500;
    ctx.status = status;
    ctx.body = createErrorResponse({
      code: status,
      message: err.message,
    });

    if (cleanup !== undefined) {
      await cleanup(ctx, noop);
    }
    ctx.app.emit("error", err, ctx);
  }
};

export function createErrorResponse(
  ...errors: ErrorJson[]
): ResponseJson<null> {
  return {
    result: null,
    success: false,
    messages: [
      "There was an error fulfilling your request. Please try again later",
    ],
    errors,
  };
}

export function createSuccessResponse<T = {}>(payload?: T) {
  const result = payload === undefined ? null : payload;

  return {
    result,
    success: true,
    messages: [],
    errors: [],
  };
}
