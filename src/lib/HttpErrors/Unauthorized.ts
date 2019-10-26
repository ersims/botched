import BotchedError from '../BotchedError';

// Exports
export class Unauthorized extends BotchedError {
  /**
   * @override
   */
  public static status = 401;
  public static title = 'Unauthorized';
}
