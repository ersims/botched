import HttpError from '../HttpError';

// Exports
export default class NotFound extends HttpError {
  /**
   * @override
   */
  public static statusCode = 404;
  public static title = 'Not Found';
}
