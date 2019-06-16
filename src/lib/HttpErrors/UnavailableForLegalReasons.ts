import BotchedError from '../BotchedError';

// Exports
export default class UnavailableForLegalReasons extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 451;
  public static title = 'Unavailable For Legal Reasons';
}
