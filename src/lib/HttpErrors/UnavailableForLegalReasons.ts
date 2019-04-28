// Imports
import HttpError from '../HttpError';

// Exports
export default class UnavailableForLegalReasons extends HttpError {
  /**
   * @override
   */
  public static statusCode = 451;
  public static title = 'Unavailable For Legal Reasons';
}
