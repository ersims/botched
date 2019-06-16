import HttpError from '../HttpError';

// Exports
export default class ServiceUnavailable extends HttpError {
  /**
   * @override
   */
  public static statusCode = 503;
  public static title = 'Service Unavailable';
}
