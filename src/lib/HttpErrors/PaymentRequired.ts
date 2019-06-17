import BotchedError from '../BotchedError';

// Exports
export class PaymentRequired extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 402;
  public static title = 'Payment Required';
}
