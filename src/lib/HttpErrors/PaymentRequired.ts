import BotchedError from '../BotchedError';

// Exports
export default class PaymentRequired extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 402;
  public static title = 'Payment Required';
}
