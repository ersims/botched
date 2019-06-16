import BotchedError from '../BotchedError';

// Exports
export default class TooEarly extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 425;
  public static title = 'Too Early';
}
