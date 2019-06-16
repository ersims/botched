import { MultiError, VError } from 'verror';

// Types
export interface MaybeDetailedError {
  data?:
    | {
        status?: any;
        statusCode?: any;
      }
    | any;
  status?: any;
  statusCode?: any;
  isBotched?: boolean;
  errors?: any;
}

/**
 * Find a logical http status code from a variety of error types
 *
 * @param {Error} err
 * @returns {number}
 */
function getStatusCode(err: Error & MaybeDetailedError): number {
  // Extract any default information
  const data = (typeof err.data === 'object' && err.data) || {};
  let statusCode = err.statusCode || err.status || data.statusCode || data.status;

  // Check for MultiError and find the most appropriate common status code
  if (err instanceof MultiError && !statusCode) {
    const errors: (Error & MaybeDetailedError)[] = err.errors();

    // Extract the most logical common status code
    errors.some(error => {
      const subStatusCode = getStatusCode(error);

      // Should we try to find a common status code (either 400 or 500)?
      if (statusCode && subStatusCode !== statusCode) {
        // Default to 400?
        if (statusCode >= 400 && statusCode < 500 && subStatusCode >= 400 && subStatusCode < 500) statusCode = 400;
        // Fallback to 500
        else statusCode = 500;
      } else statusCode = subStatusCode;

      // Just stop if the code is 500 as that will always win
      return statusCode === 500;
    });
  }

  // Still nothing?
  if (!statusCode) {
    const info = VError.info(err);
    statusCode = info.statusCode || info.status || 500;
  }

  // Return final statusCode and default to 500
  return statusCode && statusCode >= 400 ? statusCode : 500;
}

// Exports
export default getStatusCode;
