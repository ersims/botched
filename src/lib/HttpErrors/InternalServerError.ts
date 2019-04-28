// Imports
import HttpError from '../HttpError';

// Exports
export default class InternalServerError extends HttpError {
  /**
   * @override
   */
  public static statusCode = 500;
  public static title = 'Internal Server Error';
}
