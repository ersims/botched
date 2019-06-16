import BotchedError from '../BotchedError';

// Exports
export default class NotImplemented extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 501;
  public static title = 'Not Implemented';
}
