import BotchedError from '../BotchedError';

// Exports
export class Locked extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 423;
  public static title = 'Locked';
}
