import BotchedError from '../BotchedError';

// Exports
export class LengthRequired extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 411;
  public static title = 'Length Required';
}
