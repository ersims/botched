// Imports
import HttpError from '../HttpError';

// Exports
export default class UnsupportedMediaType extends HttpError {
  /**
   * @override
   */
  public static statusCode = 415;
  public static title = 'Unsupported Media Type';
}
