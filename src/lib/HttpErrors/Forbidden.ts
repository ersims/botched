import BotchedError from '../BotchedError';

// Exports
export default class Forbidden extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 403;
  public static title = 'Forbidden';
}
