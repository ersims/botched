import HttpError from '../HttpError';

// Exports
export default class NotExtended extends HttpError {
  /**
   * @override
   */
  public static statusCode = 510;
  public static title = 'Not Extended';
}
