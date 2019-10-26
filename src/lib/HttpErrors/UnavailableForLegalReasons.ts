import BotchedError from '../BotchedError';

// Exports
export class UnavailableForLegalReasons extends BotchedError {
  /**
   * @override
   */
  public static status = 451;
  public static title = 'Unavailable For Legal Reasons';
}
