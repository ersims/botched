import BotchedError from '../BotchedError';

// Exports
export default class NotExtended extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 510;
  public static title = 'Not Extended';
}
