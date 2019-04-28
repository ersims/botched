// Imports
import HttpError from '../HttpError';

// Exports
export default class TooEarly extends HttpError {
  /**
   * @override
   */
  public static statusCode = 425;
  public static title = 'Too Early';
}
