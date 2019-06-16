import BotchedError from '../BotchedError';

// Exports
export default class BadRequest extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 400;
  public static title = 'Bad Request';
}
