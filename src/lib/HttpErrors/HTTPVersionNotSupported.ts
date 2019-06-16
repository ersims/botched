import BotchedError from '../BotchedError';

// Exports
export default class HTTPVersionNotSupported extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 505;
  public static title = 'HTTP Version Not Supported';
}
