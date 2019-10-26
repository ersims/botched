import BotchedError from '../BotchedError';

// Exports
export class NotImplemented extends BotchedError {
  /**
   * @override
   */
  public static status = 501;
  public static title = 'Not Implemented';
}
