// Imports
import HttpError from '../HttpError';

// Exports
export default class BadGateway extends HttpError {
  /**
   * @override
   */
  public static statusCode = 502;
  public static title = 'Bad Gateway';
}
