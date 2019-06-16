import BotchedError from '../BotchedError';

// Exports
export default class Locked extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 423;
  public static title = 'Locked';
}
