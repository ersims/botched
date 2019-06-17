import BotchedError from '../BotchedError';

// Exports
export class Gone extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 410;
  public static title = 'Gone';
}
