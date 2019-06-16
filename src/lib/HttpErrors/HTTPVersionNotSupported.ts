import HttpError from '../HttpError';

// Exports
export default class HTTPVersionNotSupported extends HttpError {
  /**
   * @override
   */
  public static statusCode = 505;
  public static title = 'HTTP Version Not Supported';
}
