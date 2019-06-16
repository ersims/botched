import HttpError from '../HttpError';

// Exports
export default class TooManyRequests extends HttpError {
  /**
   * @override
   */
  public static statusCode = 429;
  public static title = 'Too Many Requests';
}
