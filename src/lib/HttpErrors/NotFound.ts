import BotchedError from '../BotchedError';

// Exports
export default class NotFound extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 404;
  public static title = 'Not Found';
}
