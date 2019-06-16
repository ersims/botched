import HttpError from '../HttpError';

// Exports
export default class InsufficientStorage extends HttpError {
  /**
   * @override
   */
  public static statusCode = 507;
  public static title = 'Insufficient Storage';
}
