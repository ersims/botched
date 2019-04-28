// Imports
import HttpError from '../HttpError';

// Exports
export default class Forbidden extends HttpError {
  /**
   * @override
   */
  public static statusCode = 403;
  public static title = 'Forbidden';
}
