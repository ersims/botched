import BotchedError from '../BotchedError';

// Exports
export class Forbidden extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 403;
  public static title = 'Forbidden';
}
