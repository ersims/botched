import BotchedError from '../BotchedError';

// Exports
export class LengthRequired extends BotchedError {
  /**
   * @override
   */
  public static status = 411;
  public static title = 'Length Required';
}
