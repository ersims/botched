import { BotchedError, BotchedErrorOptions } from './BotchedError';
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
 * @param {string|BotchedErrorOptions=} messageOrOptions
 * @param {string=} message
 * @returns {BotchedError}
 */
function wrap(
  err: Error,
  messageOrOptions?: BotchedErrorOptions,
  message?: string
): BotchedError;
function wrap(
  err: Error,
  message?: string
): BotchedError;
function wrap(err: Error, messageOrOptions?: string | BotchedErrorOptions, message?: string): BotchedError {
  // Return fast?
  if (isBotched(err)) return err;

  let msg = message;
  const opts = { cause: err };
  if (typeof messageOrOptions === 'object') Object.assign(opts, messageOrOptions);
  else msg = messageOrOptions;

  return isBotched(err) ? err : createError(getStatusCode(err), opts, msg);
}

// Exports
export { wrap };
