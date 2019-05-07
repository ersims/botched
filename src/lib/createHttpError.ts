// Imports
import HttpError, { HttpErrorOptions } from './HttpError';
import { httpErrorCodes } from './HttpErrors';

// Types
type httpErrorCodesPreset = typeof httpErrorCodes & { [statusCode: number]: typeof HttpError };
export type StatusCodeToHttpError = { [P in keyof httpErrorCodesPreset]: InstanceType<httpErrorCodesPreset[P]> };

// Init
function createHttpError<T extends keyof StatusCodeToHttpError>(
  statusCode: T | number,
  message?: string,
  ...params: any[]
): StatusCodeToHttpError[T];
function createHttpError<T extends keyof StatusCodeToHttpError>(
  statusCode?: T | number,
  options?: HttpErrorOptions | Error,
  message?: string,
  ...params: any[]
): StatusCodeToHttpError[T];
function createHttpError<T extends keyof StatusCodeToHttpError>(
  statusCode: T | number = 500,
  ...args: any[]
): StatusCodeToHttpError[T] {
  // Verify statusCode >= 400
  if (statusCode < 400) throw new Error('statusCode must be 400 or greater');

  if (statusCode in httpErrorCodes) return new (httpErrorCodes as httpErrorCodesPreset)[statusCode](...args);

  // Create a generic Http Error class for this missing Http Error
  const httpError = new HttpError(...args);
  httpError.statusCode = statusCode;
  return httpError;
}

// Exports
export default createHttpError;
