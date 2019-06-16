import HttpError from '../HttpError';

// Exports
export default class BadRequest extends HttpError {
  /**
   * @override
   */
  public static statusCode = 400;
  public static title = 'Bad Request';
}
