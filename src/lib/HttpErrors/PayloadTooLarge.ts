import HttpError from '../HttpError';

// Exports
export default class PayloadTooLarge extends HttpError {
  /**
   * @override
   */
  public static statusCode = 413;
  public static title = 'Payload Too Large';
}
