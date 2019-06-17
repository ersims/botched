import BotchedError from '../BotchedError';

// Exports
export class MisdirectedRequest extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 421;
  public static title = 'Misdirected Request';
}
