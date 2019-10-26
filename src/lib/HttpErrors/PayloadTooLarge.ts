import BotchedError from '../BotchedError';

// Exports
export class PayloadTooLarge extends BotchedError {
  /**
   * @override
   */
  public static status = 413;
  public static title = 'Payload Too Large';
}
