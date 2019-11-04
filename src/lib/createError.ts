import { BotchedError, BotchedErrorOptions } from './BotchedError';
import { httpErrorCodes } from './HttpErrors';
import { getStatusCode } from './getStatusCode';
import { getData } from './getData';
import { isBotched } from './isBotched';

// Types
type httpErrorCodesPreset = typeof httpErrorCodes & { [statusCode: number]: typeof BotchedError };
export type StatusCodeToHttpError = { [P in keyof httpErrorCodesPreset]: InstanceType<httpErrorCodesPreset[P]> };

// Init
function createError<T extends keyof StatusCodeToHttpError>(
  statusCodeOrError?: T | Error | number,
  message?: string,
  ...params: any[]
): StatusCodeToHttpError[T];
function createError<T extends keyof StatusCodeToHttpError>(
  statusCodeOrError: T | Error | number,
  options?: BotchedErrorOptions | Error,
  message?: string,
  ...params: any[]
): StatusCodeToHttpError[T];
function createError<T extends keyof StatusCodeToHttpError>(
  statusCodeOrError: T | Error | number = 500,
  ...args: any[]
): StatusCodeToHttpError[T] {
  //
  if (statusCodeOrError instanceof Error) {
    if (isBotched(statusCodeOrError)) return statusCodeOrError;
    const status = getStatusCode(statusCodeOrError);
    const data = getData(statusCodeOrError);
    return createError(status, { ...data, cause: statusCodeOrError }, statusCodeOrError.message);
  }

  // StatusCode is now a number
  const statusCode = statusCodeOrError || 500;

  // Verify statusCode >= 400
  if (statusCode < 400) throw new Error('statusCode must be 400 or greater');
  if (statusCode in httpErrorCodes) return new (httpErrorCodes as httpErrorCodesPreset)[statusCode](...args);

  // Create a BotchedError class for this missing Http Error
  const botchedError = new BotchedError(...args);
  botchedError.status = statusCode;
  return botchedError;
}

// Exports
export { createError };
