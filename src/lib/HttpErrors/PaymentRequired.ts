import HttpError from '../HttpError';

// Exports
export default class PaymentRequired extends HttpError {
  /**
   * @override
   */
  public static statusCode = 402;
  public static title = 'Payment Required';
}
