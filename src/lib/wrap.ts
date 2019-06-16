import HttpError from './HttpError';
import createHttpError from './createHttpError';
import getStatusCode from './getStatusCode';

// Types
export interface MaybeDetailedError {
  data?:
    | {
        status?: any;
        statusCode?: any;
        headers?: any;
      }
    | any;
  headers?: any;
  status?: any;
  statusCode?: any;
  isBotched?: boolean;
  errors?: any;
}

/**
 * Create a botch http error by wrapping the error or return the existing error if it is already a botched http error.
 * This is safe to use with any error without leaking details (except status code - which should not be sensitive).
 *
 * See `botch` for an unsafe alternative
 *
 * @param {Error} err
 * @returns {HttpError}
 */
function wrap(err: Error & MaybeDetailedError): HttpError {
  return err instanceof HttpError ? err : createHttpError(getStatusCode(err), { cause: err });
}

// Exports
export default wrap;
