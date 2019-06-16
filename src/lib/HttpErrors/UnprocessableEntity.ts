import HttpError from '../HttpError';

// Exports
export default class UnprocessableEntity extends HttpError {
  /**
   * @override
   */
  public static statusCode = 422;
  public static title = 'Unprocessable Entity';
}
