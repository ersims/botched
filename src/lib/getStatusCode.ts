import { VError } from 'verror';
import { MaybeDetailedError } from './botch';

/**
 * Find a reasonable http status code from a variety of error types
 *
 * @param {Error} err
 * @returns {number}
 */
function getStatusCode(err: MaybeDetailedError): number {
  const data = (typeof err.data === 'object' && err.data) || {};
  let statusCode = err.status || data.status;

  // Check for MultiError and find the most appropriate common status code
  if (err.errors && typeof err.errors === 'function' && !statusCode) {
    // Should we default to 400 or 500?
    err.errors().some((error: MaybeDetailedError) => {
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
  } else if (!statusCode) {
    const info = VError.info(err);
    statusCode = info.status || info.statusCode || 500;
  }

  // Return final statusCode if valid or default to 500
  return statusCode >= 400 ? statusCode : 500;
}

// Exports
export { getStatusCode };
