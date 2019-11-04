import { BotchedError } from './BotchedError';
import { createError } from './createError';
import { getStatusCode } from './getStatusCode';
import { isBotched } from './isBotched';

/**
 * Create a botched error based on a generic error. This will return the error directly if it is
 * already a botched error or create a new error while only inheriting the status code.
 * This is safe to use with any error without leaking sensitive information - as long as status code
 * is not sensitive.
 *
 * See `botch` for an unsafe, but more comprehensible alternative
 *
 * @param {Error} err
 * @returns {BotchedError}
 */
function wrap(err: Error): BotchedError {
  return isBotched(err) ? err : createError(getStatusCode(err), { cause: err });
}

// Exports
export { wrap };
