import HttpError from '../HttpError';

// Exports
export default class ProxyAuthenticationRequired extends HttpError {
  /**
   * @override
   */
  public static statusCode = 407;
  public static title = 'Proxy Authentication Required';
}
