// Imports
import HttpError from '../HttpError';

// Exports
export default class MethodNotAllowed extends HttpError {
  /**
   * @override
   */
  public static statusCode = 405;
  public static title = 'Method Not Allowed';
}
