import BotchedError from '../BotchedError';

// Exports
export default class URITooLong extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 414;
  public static title = 'URI Too Long';
}
