import { BotchedError } from '../BotchedError';

// Exports
export class PaymentRequired extends BotchedError {
  /**
   * @override
   */
  public static status = 402;
  public static title = 'Payment Required';
}
