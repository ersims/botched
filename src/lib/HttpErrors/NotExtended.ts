import BotchedError from '../BotchedError';

// Exports
export class NotExtended extends BotchedError {
  /**
   * @override
   */
  public static status = 510;
  public static title = 'Not Extended';
}
