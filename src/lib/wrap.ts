import BotchedError from './BotchedError';
import createError from './createError';
import getStatusCode from './getStatusCode';
import isBotched from './isBotched';

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
  errors?: any;
}

/**
 * Create a botch http error by wrapping the error or return the existing error if it is already a botched http error.
 * This is safe to use with any error without leaking details (except status code - which should not be sensitive).
 *
 * See `botch` for an unsafe alternative
 *
 * @param {Error} err
 * @returns {BotchedError}
 */
function wrap(err: Error & MaybeDetailedError): BotchedError {
  return isBotched(err) ? err : createError(getStatusCode(err), { cause: err });
}

// Exports
export default wrap;
