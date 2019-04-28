// Imports
import HttpError from '../HttpError';

// Exports
export default class Conflict extends HttpError {
  /**
   * @override
   */
  public static statusCode = 409;
  public static title = 'Conflict';
}
