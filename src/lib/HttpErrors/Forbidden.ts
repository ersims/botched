import BotchedError from '../BotchedError';

// Exports
export class Forbidden extends BotchedError {
  /**
   * @override
   */
  public static status = 403;
  public static title = 'Forbidden';
}
