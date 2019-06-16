import HttpError from '../HttpError';

// Exports
export default class NetworkAuthenticationRequired extends HttpError {
  /**
   * @override
   */
  public static statusCode = 511;
  public static title = 'Network Authentication Required';
}
