import BotchedError from '../BotchedError';

// Exports
export class UnsupportedMediaType extends BotchedError {
  /**
   * @override
   */
  public static statusCode = 415;
  public static title = 'Unsupported Media Type';
}
