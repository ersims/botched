import BotchedError from '../BotchedError';

// Exports
export class MisdirectedRequest extends BotchedError {
  /**
   * @override
   */
  public static status = 421;
  public static title = 'Misdirected Request';
}
