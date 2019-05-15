// Imports
import { MultiError, VError } from 'verror';
import HttpError from './HttpError';
import createHttpError from './createHttpError';

// Types
interface MaybeDetailedError {
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
 * Create a botch http error or return the existing error if it is already a botched http error
 *
 * @param {Error} err
 * @returns {HttpError}
 */
function botch(err: Error & MaybeDetailedError): HttpError {
  // Return fast?
  if (err instanceof HttpError) return err;

  // Extract any default information
  const data = (typeof err.data === 'object' && err.data) || VError.info(err);
  let statusCode = err.statusCode || err.status || data.statusCode || data.status;
  const headers = err.headers || err.headers || data.headers || data.headers;

  // Check for MultiError and find the most appropriate common status code
  // We do not aggregate headers as that could be confusing when some headers overlap between errors
  if (err instanceof MultiError && !statusCode) {
    const errors: (Error & MaybeDetailedError)[] = err.errors();

    // Extract the most logical common status code
    for (const error of errors) {
      const subData = (typeof error.data === 'object' && error.data) || VError.info(error);
      const subStatusCode = error.statusCode || error.status || subData.statusCode || subData.status || 500;

      // Should we try to find a common status code (either 400 or 500)?
      if (statusCode && subStatusCode !== statusCode) {
        // Default to 400?
        if (statusCode >= 400 && statusCode < 500 && subStatusCode >= 400 && subStatusCode < 500) statusCode = 400;
        // Fallback to 500
        else statusCode = 500;
      } else statusCode = subStatusCode;

      // Just stop if the code is 500 as that will always win
      if (statusCode === 500) break;
    }
  }

  // Set final statuscode
  statusCode = statusCode || 500;

  return createHttpError(statusCode, { headers, cause: err }, statusCode !== 500 ? err.message : '');
}

// Exports
export default botch;
