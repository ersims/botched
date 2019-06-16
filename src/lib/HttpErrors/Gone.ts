import BotchedError from '../BotchedError';

// Exports
export default class Gone extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 410;
  public static title = 'Gone';
}
