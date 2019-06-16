import HttpError from '../HttpError';

// Exports
export default class RequestTimeout extends HttpError {
  /**
   * @override
   */
  public static statusCode = 408;
  public static title = 'Request Timeout';
}
