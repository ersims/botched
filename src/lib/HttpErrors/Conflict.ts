import BotchedError from '../BotchedError';

// Exports
export class Conflict extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 409;
  public static title = 'Conflict';
}
