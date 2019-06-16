import { VError } from 'verror';
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
        id?: any;
        code?: any;
        title?: any;
        source?: any;
        links?: any;
        meta?: any;
      }
    | any;
  status?: any;
  statusCode?: any;
  isBotched?: boolean;
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
 * Create a botch http error or return the existing error if it is already a botched http error.
 * This is NOT safe to use if errors may contain sensitive information because details may be leaked.
 *
 * See `wrap` for a safe alternative
 *
 * @param {Error} err
 * @returns {HttpError}
 */
function botch(err: Error & MaybeDetailedError): HttpError {
  // Return fast?
  if (err instanceof HttpError) return err;

  // Extract any default information
  const statusCode = getStatusCode(err);
  const data = (typeof err.data === 'object' && err.data) || VError.info(err);
  const headers = err.headers || err.headers || data.headers || data.headers;

  return createHttpError(
    statusCode,
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
