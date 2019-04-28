// Imports
import HttpError from '../HttpError';

// Exports
export default class Unauthorized extends HttpError {
  /**
   * @override
   */
  public static statusCode = 401;
  public static title = 'Unauthorized';
}
