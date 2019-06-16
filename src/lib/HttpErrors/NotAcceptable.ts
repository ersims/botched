import BotchedError from '../BotchedError';

// Exports
export default class NotAcceptable extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 406;
  public static title = 'Not Acceptable';
}
