// Imports
import GenericError from './GenericError';

/**
 * Create a botch error or return the existing error if it is already a botched error
 *
 * @param {Error} error
 * @returns {GenericError}
 */
function botch(error: Error): GenericError {
  return error instanceof GenericError ? error : new GenericError(error);
}

// Exports
export default botch;
