import BotchedError from '../BotchedError';

// Exports
export class NotAcceptable extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 406;
  public static title = 'Not Acceptable';
}
