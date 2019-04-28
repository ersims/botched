// Imports
import HttpError from '../HttpError';

// Exports
export default class ExpectationFailed extends HttpError {
  /**
   * @override
   */
  public static statusCode = 417;
  public static title = 'Expectation Failed';
}
