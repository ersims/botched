import BotchedError from '../BotchedError';

// Exports
export default class PayloadTooLarge extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 413;
  public static title = 'Payload Too Large';
}
