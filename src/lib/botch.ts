import { VError } from 'verror';
import { BotchedError } from './BotchedError';
import { createError } from './createError';
import { getStatusCode } from './getStatusCode';
import { isBotched } from './isBotched';
import { getData } from './getData';

// Types
export interface MaybeDetailedError extends Error {
  data?:
    | {
        status?: any;
        statusCode?: any;
        headers?: any;
        id?: any;
        code?: any;
        title?: any;
        source?: any;
        links?: any;
        meta?: any;
      }
    | any;
  status?: any;
  errors?: any;
  headers?: any;
  id?: any;
  code?: any;
  title?: any;
  source?: any;
  links?: any;
  meta?: any;
}

/**
 * Create a botched error based on a generic error. This will return the error directly if it is
 * already a botched error or create a new error while inheriting props like id, data, headers etc.
 * Note that this is *NOT* safe to use if errors may contain sensitive information. Only use this
 * if you know what errors you are dealing with.
 *
 * See `wrap` for a safe alternative
 *
 * @param {Error} err
 * @returns {BotchedError}
 */
function botch(err: MaybeDetailedError): BotchedError {
  // Return fast?
  if (isBotched(err)) return err;

  // Extract any default information
  const status = getStatusCode(err);

  // Extract potentially unsafe properties
  const data = getData(err);

  return createError(status, { ...data, cause: err }, err.message);
}

// Exports
export { botch };
