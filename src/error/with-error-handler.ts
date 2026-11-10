import { AppError } from "@error/app-error";
import {
  handleMongoError,
  isMongoError,
  isMongooseError,
} from "@hooks/handle-mongo-errors";
import { ApiResponse } from "@lib/api-response";
import type { TServerEndpoint } from "@type/server-endpoint";
import { unstable_rethrow } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type HandlerFn<Context> = (
  req: NextRequest,
  context: Context,
) => Promise<Response>;

type ActionFn<Args extends unknown[], Result> = (
  ...args: Args
) => Promise<Result>;

export type ActionFailure = ReturnType<typeof ApiResponse.actionFailure>;

/**
 * Wraps a route handler so every thrown error answers with an ApiResponse
 * body. AppErrors keep their message and status code; anything else is
 * logged and answered as a 500 without its details.
 */
export function withHttpErrorHandler<Context>(
  handler: HandlerFn<Context>,
): HandlerFn<Context> {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      const body = ApiResponse.fromError(toAppError(error, "route-handler"));
      return NextResponse.json(body, { status: body.httpStatusCode });
    }
  };
}

/**
 * Wraps a server action so a thrown error comes back as an ApiResponse
 * failure instead of reaching the client as an exception, which Next.js
 * strips of its message in production. AppErrors keep their message;
 * anything else is logged and answered with a generic message.
 */
export function withActionErrorHandler<Args extends unknown[], Result>(
  action: ActionFn<Args, Result>,
): ActionFn<Args, Result | ActionFailure> {
  return async (...args) => {
    try {
      return await action(...args);
    } catch (error) {
      return ApiResponse.actionFromError(toAppError(error, "server-action"));
    }
  };
}

/**
 * Turns a caught value into an AppError. Errors thrown by redirect() and
 * notFound() are passed on to Next.js, and unexpected errors are logged
 * before their details are hidden.
 */
function toAppError(error: unknown, endpoint: TServerEndpoint) {
  unstable_rethrow(error);
  if (isMongooseError(error) || isMongoError(error)) {
    return handleMongoError(error, endpoint);
  }

  return AppError.fromUnknown({ error, endpoint });
}
