import BotchedError from '../BotchedError';

// Exports
export default class BadGateway extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 502;
  public static title = 'Bad Gateway';
}
