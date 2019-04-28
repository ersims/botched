// Imports
import HttpError from '../HttpError';

// Exports
export default class URITooLong extends HttpError {
  /**
   * @override
   */
  public static statusCode = 414;
  public static title = 'URI Too Long';
}
