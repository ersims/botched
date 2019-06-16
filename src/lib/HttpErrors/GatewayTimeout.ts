import HttpError from '../HttpError';

// Exports
export default class GatewayTimeout extends HttpError {
  /**
   * @override
   */
  public static statusCode = 504;
  public static title = 'Gateway Timeout';
}
