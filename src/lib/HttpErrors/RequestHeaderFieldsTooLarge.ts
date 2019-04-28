// Imports
import HttpError from '../HttpError';

// Exports
export default class RequestHeaderFieldsTooLarge extends HttpError {
  /**
   * @override
   */
  public static statusCode = 431;
  public static title = 'Request Header Fields Too Large';
}
