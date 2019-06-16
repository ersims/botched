import HttpError from '../HttpError';

// Exports
export default class PreconditionFailed extends HttpError {
  /**
   * @override
   */
  public static statusCode = 412;
  public static title = 'Precondition Failed';
}
