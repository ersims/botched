import BotchedError from '../BotchedError';

// Exports
export class RangeNotSatisfiable extends BotchedError {
  /**
   * @override
   */
  public static status = 416;
  public static title = 'Range Not Satisfiable';
}
