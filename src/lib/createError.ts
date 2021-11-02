import BotchedError, { ErrorOptions } from './BotchedError';
import { httpErrorCodes } from './HttpErrors';

// Types
type httpErrorCodesPreset = typeof httpErrorCodes & { [statusCode: number]: typeof BotchedError };
export type StatusCodeToHttpError = {
  [P in keyof httpErrorCodesPreset]: InstanceType<httpErrorCodesPreset[P]>;
};

// Init
function createError<T extends keyof StatusCodeToHttpError>(
  statusCode: T | number,
  message?: string,
  ...params: any[]
): StatusCodeToHttpError[T];
function createError<T extends keyof StatusCodeToHttpError>(
  statusCode?: T | number,
  options?: ErrorOptions | Error,
  message?: string,
  ...params: any[]
): StatusCodeToHttpError[T];
function createError<T extends keyof StatusCodeToHttpError>(
  statusCode: T | number = 500,
  ...args: any[]
): StatusCodeToHttpError[T] {
  // Verify statusCode >= 400
  if (statusCode < 400) throw new Error('statusCode must be 400 or greater');

  if (statusCode in httpErrorCodes)
    return new (httpErrorCodes as httpErrorCodesPreset)[statusCode](...args);

  // Create a BotchedError class for this missing Http Error
  const botchedError = new BotchedError(...args);
  botchedError.statusCode = statusCode;
  return botchedError;
}

// Exports
export default createError;
