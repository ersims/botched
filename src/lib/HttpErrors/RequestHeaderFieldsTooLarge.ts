import BotchedError from '../BotchedError';

// Exports
export default class RequestHeaderFieldsTooLarge extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 431;
  public static title = 'Request Header Fields Too Large';
}
