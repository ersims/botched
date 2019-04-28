// Imports
import HttpError from '../HttpError';

// Exports
export default class NotImplemented extends HttpError {
  /**
   * @override
   */
  public static statusCode = 501;
  public static title = 'Not Implemented';
}
