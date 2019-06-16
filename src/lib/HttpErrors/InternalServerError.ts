import BotchedError from '../BotchedError';

// Exports
export default class InternalServerError extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 500;
  public static title = 'Internal Server Error';
}
