import { VError } from 'verror';
import BotchedError from './BotchedError';
import createError from './createError';
import getStatusCode from './getStatusCode';
import isBotched from './isBotched';

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
export interface BotchOptions {
  // Trust error properties - other than the status code?
  useUnsafeErrorProps?: boolean;
}

/**
 * Create a botch http error or return the existing error if it is already a botched http error.
 *
 * Use the `useUnsafeErrorProps` option if you trust the error to not contain any sensitive information
 * and would like to hoist common error properties such as id, code, title, source, links and meta to the
 * created error.
 *
 * @param {Error} err
 * @param {BotchOptions=} options
 * @returns {BotchedError}
 */
function botch(err: MaybeDetailedError, options: BotchOptions = { useUnsafeErrorProps: false }): BotchedError {
  // Return fast?
  if (isBotched(err)) return err;

  // Extract any default information
  const status = getStatusCode(err);
  console.log(status)
  // Create a safe botch error?
  if (!options || !options.useUnsafeErrorProps) return createError(status, { cause: err });

  // Extract potentially unsafe properties
  const data = (typeof err.data === 'object' && err.data) || VError.info(err);
  const headers = err.headers || err.headers || data.headers || data.headers;

  return createError(
    status,
    {
      headers,
      id: err.id || data.id,
      code: err.code || data.code,
      title: err.title || data.title,
      source: err.source || data.source,
      links: err.links || data.links,
      meta: err.meta || data.meta,
      cause: err,
    },
    err.message,
  );
}

// Exports
export default botch;
