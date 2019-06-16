import HttpError from '../HttpError';

// Exports
export default class NotAcceptable extends HttpError {
  /**
   * @override
   */
  public static statusCode = 406;
  public static title = 'Not Acceptable';
}
