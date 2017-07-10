import { assert as t } from "chai";
import * as sinon from "sinon";
import { Context } from "koa";
import {
  createErrorResponse,
  createSuccessResponse,
  handleErrors,
} from "../errors";

const noop = () => {
  /* noop */
};

const noopThrow = () => {
  throw new Error("Foo");
};

describe("createErrorResponse", () => {
  it("should create response", () => {
    t.deepEqual(createErrorResponse(), {
      result: null,
      success: false,
      messages: [
        "There was an error fulfilling your request. Please try again later",
      ],
      errors: [],
    });

    t.deepEqual(createErrorResponse({ code: 123, message: "foo" }), {
      result: null,
      success: false,
      messages: [
        "There was an error fulfilling your request. Please try again later",
      ],
      errors: [
        {
          code: 123,
          message: "foo",
        },
      ],
    });
  });
});

describe("createSuccessResponse", () => {
  it("should create response", () => {
    t.deepEqual(createSuccessResponse(), {
      result: null,
      success: true,
      messages: [],
      errors: [],
    });

    t.deepEqual(createSuccessResponse({ foo: 1 }), {
      result: { foo: 1 },
      success: true,
      messages: [],
      errors: [],
    });
  });
});

describe("handleErrors", () => {
  it("should set error response", async () => {
    const emitter = sinon.spy();
    const ctx = {
      status: 0,
      body: undefined,
      app: {
        emit: emitter,
      },
    } as any;

    await handleErrors()(ctx, noopThrow);

    t.equal(emitter.calledOnce, true);
    t.equal(ctx.status, 500);
    t.deepEqual(ctx.body, {
      success: false,
      result: null,
      errors: [
        {
          code: 500,
          message: "Foo",
        },
      ],
      messages: [
        "There was an error fulfilling your request. Please try again later",
      ],
    });
  });

  it("should call cleanup middleware", async () => {
    const ctx = {
      status: 0,
      body: undefined,
      app: {
        emit: noop,
      },
    } as any;

    const spy = sinon.spy();
    await handleErrors(spy)(ctx, noopThrow);

    t.equal(spy.callCount, 1);
  });
});
