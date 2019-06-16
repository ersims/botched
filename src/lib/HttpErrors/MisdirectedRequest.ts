import BotchedError from '../BotchedError';

// Exports
export default class MisdirectedRequest extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 421;
  public static title = 'Misdirected Request';
}
