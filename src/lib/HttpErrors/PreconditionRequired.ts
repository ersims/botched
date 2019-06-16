import HttpError from '../HttpError';

// Exports
export default class PreconditionRequired extends HttpError {
  /**
   * @override
   */
  public static statusCode = 428;
  public static title = 'Precondition Required';
}
